import React from 'react';

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import images from '@/assets/images';
import { Flex, P2, P3 } from '@/components';
import TextInput from '@/components/Inputs/BaseInput';

import MapLoader from './MapLoader';
import { LocationButton, LocationsWrapper } from './styles';

type LocationType = google.maps.LatLngLiteral;

type Props = {
  onChange?: (location: LocationType) => void;
  height?: string;
  center?: LocationType;
};

export default function Map({ onChange, height, center }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_APIKEY!,
    libraries: ['places'],
    region: 'SA',
  });

  const [selection, setSelection] = React.useState<LocationType>(
    center || {
      lat: 24.713552,
      lng: 46.675297,
    },
  );

  const mapRef = React.useRef(null);

  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 24.713552,
        lng: () => 46.675297,
      } as google.maps.LatLng,
      radius: 1000000000,
      types: ['locality'],
      componentRestrictions: { country: 'SA' },
    },
  });

  const onMapLoad = (map: any) => {
    mapRef.current = map;
    init();
  };

  const onMapClick = React.useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        setSelection({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        if (onChange) onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }
    },
    [onChange],
  );
  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setSelection({ lat, lng });
          if (onChange) {
            onChange({ lat, lng });
          }
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <LocationButton key={place_id} onClick={handleSelect(suggestion)}>
          <P2 text={main_text} />
          {secondary_text && <P3 text={secondary_text} />}
        </LocationButton>
      );
    });

  if (!isLoaded) return <MapLoader />;

  return (
    <Flex direction="column" p={2} gap={{ xs: 6, md: 12 }} fullWidth>
      <TextInput
        name="places"
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        disabled={!ready}
        placeholder="searchLocation"
      />
      {status === 'OK' && (
        <LocationsWrapper
          p={4}
          direction="column"
          gap={{ xs: 6, md: 8 }}
          fullWidth
        >
          {renderSuggestions()}
        </LocationsWrapper>
      )}
      <GoogleMap
        id="map"
        mapContainerStyle={{
          height: height || '500px',
          width: '100%',
        }}
        zoom={18}
        center={selection}
        options={{
          zoomControl: true,
        }}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={{ lat: selection.lat, lng: selection.lng }}
          icon={images.LOCATION_MARKER}
        />
      </GoogleMap>
    </Flex>
  );
}
