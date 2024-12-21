import React from 'react';

import { useTheme } from '@emotion/react';
import loGet from 'lodash/get';
import Geocode from 'react-geocode';
import { useFormContext } from 'react-hook-form';

import {
  Flex,
  ConfirmModal,
  Modal,
  MapLoader,
  GoogleMap,
  P1,
  P3,
} from '@/components';
import { formDataHandler } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import { useBreakpoints, useAppDispatch, useAxiosInstance } from '@/hooks';
import { getAddresses } from '@/state/order/addressesServices';
import { closeModal } from '@/state/ui-actions/slice';

import { AddressesList } from '../../styles';
import NoCarriers from '../ShippingStep/NoCarriers';

type Address = {
  addressLine: string;
  coordinates: google.maps.LatLngLiteral;
  details: {
    country: string;
    state: string;
    city: string;
    subLocality: string;
    postalCode: string;
  };
};

const getAddressInfo = (addressComponents: any[]): Address['details'] => {
  const countryComponent = addressComponents.find((comp) => {
    return (comp.types as string[]).includes('country');
  });
  const provinceComponent = addressComponents.find((comp) => {
    return (comp.types as string[]).includes('administrative_area_level_1');
  });
  const cityComponent = addressComponents.find((comp) => {
    return (comp.types as string[]).includes('locality');
  });
  const subLocalityComponent = addressComponents.find((comp) => {
    return (comp.types as string[]).includes('sublocality');
  });
  const postalCodeComponent = addressComponents.find((comp) => {
    return (comp.types as string[]).includes('postal_code');
  });

  const details: Address['details'] = {
    country: countryComponent?.long_name as string,
    state: provinceComponent?.long_name as string,
    city: cityComponent?.long_name as string,
    subLocality: subLocalityComponent?.long_name as string,
    postalCode: postalCodeComponent?.long_name as string,
  };

  return details;
};

export default function MapAddressSelect() {
  const dispatch = useAppDispatch();
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_APIKEY!);
  Geocode.setLanguage('en');
  Geocode.setRegion('SA');
  Geocode.setLocationType('ROOFTOP');
  const { post } = useAxiosInstance();
  const { pallet } = useTheme();
  const { medium } = useBreakpoints();
  const { setValue } = useFormContext();

  const [mapCenter, setMapCenter] = React.useState<google.maps.LatLngLiteral>();
  const [loadingLocation, isLoadingLocation] = React.useState<boolean>(true);
  const [sendingAddress, setSendingAddress] = React.useState<boolean>(false);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [addressError, setAddressError] = React.useState<string | null>(null);
  const [geoError, setGeoError] = React.useState<number>(0);
  const [openCarriers, setOpenNoCarriers] = React.useState<boolean>(false);
  const [addressInfo, setAddressInfo] = React.useState<any>();
  const setAddressesList = React.useCallback(
    (coords: google.maps.LatLngLiteral) => {
      Geocode.fromLatLng(String(coords.lat), String(coords.lng)).then(
        (response) => {
          if (response.status !== 'ZERO_RESULTS') {
            setAddressError(null);
            setAddresses(
              (response.results as any[]).map((item) => ({
                addressLine: item.formatted_address,
                coordinates: item.geometry.location,
                details: getAddressInfo(item.address_components),
              })),
            );
          } else {
            setAddressError('regionNotCovered');
            setAddresses([]);
          }
        },
        () => {
          setAddressError('regionNotCovered');
          setAddresses([]);
        },
      );
    },
    [],
  );

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(currentLocation);
          setAddressesList(currentLocation);
          isLoadingLocation(false);
        },
        function (error) {
          if (error.code === 1) {
            setGeoError(error.code);
          }
          isLoadingLocation(false);
        },
      );
    } else {
      setGeoError(2);
      isLoadingLocation(false);
    }
  }, [setAddressesList]);

  return (
    <Flex
      direction={{ xs: 'column-reverse', md: 'row' }}
      gap={{ xs: 6, md: 12, lg: 24 }}
      fullWidth
    >
      <Flex
        direction="column"
        gap={{ xs: 6, md: 8, lg: 16 }}
        flex={4}
        fullWidth={!medium}
      >
        <P1
          color={pallet.text.heading}
          weight={500}
          text="selectAddressFromList"
        />
        <AddressesList
          p={4}
          direction="column"
          gap={{ xs: 6, md: 8, lg: 16 }}
          fullWidth
        >
          {!addressError &&
            addresses?.map((ad) => (
              <button
                className="address--button"
                type="button"
                aria-label="address button"
                key={ad.addressLine}
                disabled={sendingAddress}
                onClick={async () => {
                  setSendingAddress(true);
                  setAddressInfo({
                    address_line: ad.addressLine,
                    longitude: String(ad.coordinates.lng),
                    latitude: String(ad.coordinates.lat),
                    ...ad.details,
                  });
                  post(
                    'customer/addresses',
                    formDataHandler({
                      address_line: ad.addressLine,
                      longitude: String(ad.coordinates.lng),
                      latitude: String(ad.coordinates.lat),
                      ...ad.details,
                    }),
                  )
                    .then((res) =>
                      dispatch(
                        getAddresses({
                          onSuccess() {
                            setValue(
                              'addressId',
                              loGet(res, 'data.records.id'),
                            );
                            setSendingAddress(false);
                            dispatch(closeModal(modalKeys.addAddressModal));
                          },
                        }),
                      ),
                    )
                    .catch((error) => {
                      const errors = loGet(error, 'response.data.errors', []);
                      if (
                        errors.length > 0 &&
                        errors[0].key === 'city_not_found'
                      ) {
                        setOpenNoCarriers(true);
                      }
                    });
                }}
              >
                <P3 text={ad.addressLine} />
              </button>
            ))}
          {addressError && <P3 text={addressError} />}
        </AddressesList>
      </Flex>
      <Flex flex={8} fullWidth={!medium}>
        {geoError ? (
          <ConfirmModal
            open={Boolean(geoError)}
            onClose={() => {
              setGeoError(0);
            }}
            onConfirm={async () => {
              setGeoError(0);
            }}
            heading={geoError === 1 ? 'browserDeniedGeolocation' : 'notSupport'}
            description={
              geoError === 1
                ? 'browserDeniedDescription'
                : 'notSupportDescription'
            }
            buttonLabel="skip"
          />
        ) : !loadingLocation ? (
          <GoogleMap
            center={mapCenter}
            height={medium ? '400px' : '300px'}
            onChange={setAddressesList}
          />
        ) : (
          <MapLoader />
        )}
      </Flex>
      <Modal
        open={openCarriers}
        disableEscapeKeyDown
        onClose={() => setOpenNoCarriers(false)}
      >
        <NoCarriers
          onConfirm={async (cityId: string) => {
            await post(
              'customer/addresses',
              formDataHandler({
                city_id: cityId,
                ...addressInfo,
              }),
            ).then(() =>
              dispatch(
                getAddresses({
                  onSuccess() {
                    dispatch(closeModal(modalKeys.addAddressModal));
                  },
                }),
              ),
            );
          }}
        />
      </Modal>
    </Flex>
  );
}
