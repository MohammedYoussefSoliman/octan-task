import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import {
  Card,
  Button,
  Flex,
  Icon,
  AddressDelete,
  Modal,
  H6,
  P1,
  P2,
  P3,
} from '@/components';
import RadioOption from '@/components/Inputs/RadioInput/RadioOption';
import { useStepperApi } from '@/components/Stepper';
import { formDataHandler, scrollToTop } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import { useAppDispatch, useAppSelector, useBreakpoints } from '@/hooks';
import { postShippingCompanies } from '@/state/order/getShippingInfo';
import { closeModal, openModal } from '@/state/ui-actions/slice';

import StepAction from '../../StepAction';
import { AddressesWrapper, ItemCard } from '../../styles';

import MapAddressSelect from './MapAddressSelect';

export default function AddressBookStep() {
  const dispatch = useAppDispatch();
  const { medium } = useBreakpoints();
  const {
    consumerOrder: { addressBook, order },
    uiActions: { modals },
  } = useAppSelector((state) => state);
  const { handleNext } = useStepperApi();
  const { setValue, getValues } = useFormContext();
  const { pallet, branding } = useTheme();
  const [activeValue, setActiveValue] = React.useState<string>(
    getValues('addressId'),
  );
  const [fetchingShippingCompanies, setFetchingShippingCompanies] =
    React.useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('addressId', e.target.value);
    setActiveValue(e.target.value);
  };

  React.useEffect(() => {
    scrollToTop(200);
    if (addressBook.length === 1) {
      setValue('addressId', addressBook[0].id);
      setActiveValue(addressBook[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card heading="addressInformation">
        <Flex
          direction="column"
          align="center"
          gap={{ xs: 10, md: 20, lg: 40 }}
          fullWidth
        >
          <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} fullWidth>
            <P1 text="chooseShippingAddress" />
            <AddressesWrapper
              direction="column"
              gap={{ xs: 7, md: 15, lg: 30 }}
              p="2px"
              fullWidth
            >
              {addressBook?.map((item) => (
                <ItemCard
                  gap={{ xs: 6, md: 8, lg: 16 }}
                  key={item.id}
                  align="center"
                  pr={{ xs: 16 }}
                  fullWidth
                >
                  <Flex
                    pt={{ xs: 4, md: 2 }}
                    direction="column"
                    width="fit-content"
                  >
                    <RadioOption
                      name="addressId"
                      value={item.id}
                      activeValue={activeValue}
                      changeHandler={changeHandler}
                    />
                  </Flex>
                  <Flex
                    gap={{ xs: 6, md: 10, lg: 20 }}
                    direction="column"
                    flex={1}
                  >
                    {item.label && (
                      <H6 text={item.label} capitalizeFirstLetter />
                    )}
                    <Flex
                      p={{ xs: 5, sm: 16, md: 24 }}
                      className="address-wrapper"
                      align={{ xs: 'start', md: 'center' }}
                      gap={{ xs: 6, md: 0 }}
                      fullWidth
                      justify="space-between"
                    >
                      <Flex
                        align={{ xs: 'start', md: 'center' }}
                        gap={{ xs: 5, md: 10 }}
                        fullWidth
                      >
                        {medium && (
                          <Icon name="location" color={branding.primaryColor} />
                        )}
                        {medium ? (
                          <P2
                            text={item.address_line}
                            color={pallet.text.heading}
                            capitalizeFirstLetter
                          />
                        ) : (
                          <P3
                            text={item.address_line}
                            color={pallet.text.heading}
                            capitalizeFirstLetter
                          />
                        )}
                      </Flex>

                      <AddressDelete
                        id={item.id}
                        onAddressDeleted={() => setValue('addressId', '')}
                      />
                    </Flex>
                  </Flex>
                </ItemCard>
              ))}
            </AddressesWrapper>
            <Button
              onClick={() => dispatch(openModal(modalKeys.addAddressModal))}
              variant="secondary"
              color={branding.primaryColor}
              fullWidth
            >
              <Flex gap={{ xs: 6, md: 8, lg: 16 }} align="center">
                <Icon
                  name="plus-circle"
                  size={28}
                  color={branding.primaryColor ?? pallet.primary[500]}
                />
                <P2
                  text="addAddress"
                  color={branding.primaryColor ?? pallet.primary[600]}
                />
              </Flex>
            </Button>
          </Flex>
          <StepAction
            onClick={async () => {
              dispatch(
                postShippingCompanies({
                  formData: formDataHandler({
                    address_id: getValues('addressId'),
                    store_id: order?.store.id,
                  }),
                  setLoading: setFetchingShippingCompanies,
                  onSuccess() {
                    handleNext();
                  },
                }),
              );
            }}
            isLoading={fetchingShippingCompanies}
            watchedKey="addressId"
          />
        </Flex>
      </Card>
      <Modal
        open={modals?.includes(modalKeys.addAddressModal)}
        onClose={() => dispatch(closeModal(modalKeys.addAddressModal))}
        title="selectAddress"
        maxHeight="90vh"
      >
        <MapAddressSelect />
      </Modal>
    </>
  );
}
