import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import {
  Flex,
  Icon,
  Card,
  ConfirmModal,
  Modal,
  Spinner,
  P1,
  P2,
  P3,
} from '@/components';
import { useStepperApi } from '@/components/Stepper';
import { formDataHandler, scrollToTop } from '@/helpers/functions';
import { CheckOrderForm } from '@/helpers/types';
import {
  useAppDispatch,
  useAppSelector,
  useAxiosInstance,
  useBreakpoints,
} from '@/hooks';
import { postShippingCompanies } from '@/state/order/getShippingInfo';

import StepAction from '../../StepAction';
import StepHeader from '../../StepHeader';
import StoreAcceptancePolicy from '../../StoreAcceptancePolicy';
import { AddressWrapper, AmountWrapper } from '../../styles';
import Table from '../Table';

import NoCarriers from './NoCarriers';
import ShippingCompany from './ShippingCompany';

export default function ShippingStep() {
  const dispatch = useAppDispatch();
  const {
    order,
    refundReasons,
    addressBook,
    orderDetails: { shippingDetails },
  } = useAppSelector((state) => state.consumerOrder);
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);
  const [isDropOff, setIsDropOff] = React.useState<boolean>(false);
  const { handleCompleted, handleNext, activeStep } = useStepperApi();
  const { post } = useAxiosInstance();

  const shippingCompanies = shippingDetails || [];
  const { pallet, branding } = useTheme();
  const { medium } = useBreakpoints();
  const { getValues } = useFormContext<CheckOrderForm>();
  const { addressId } = getValues();
  const [openCarriers, setOpenNoCarriers] = React.useState<boolean>(
    shippingCompanies.length <= 0,
  );
  const [fetchingShippingCompanies, setFetchingShippingCompanies] =
    React.useState<boolean>(false);

  const confirmDropOff = async () => {
    handleCompleted(activeStep);
    handleNext();
    setOpenConfirmModal(false);
  };

  React.useEffect(() => {
    scrollToTop(150);
  }, []);

  if (!order) return null;

  return (
    <Card heading="shippingInformation">
      <Flex
        direction="column"
        align="center"
        gap={{ xs: 6, md: 20, lg: 40 }}
        fullWidth
      >
        <Flex direction="column" gap={{ xs: 8, md: 15, lg: 30 }} fullWidth>
          {order.store && (
            <>
              <StepHeader
                logo={order.store.logo}
                name={order.store.name}
                orderId={order.order_number}
              />
              <StoreAcceptancePolicy
                agreementUrl={order.store.agreement_url}
                text="shipmentCost"
              />
            </>
          )}
          {fetchingShippingCompanies ? (
            <Flex align="center" justify="center" pv="0.5rem" fullWidth>
              <Spinner />
            </Flex>
          ) : (
            <ShippingCompany
              shippingCompanies={shippingCompanies}
              setIsDropOff={setIsDropOff}
            />
          )}
        </Flex>
        <AmountWrapper fullWidth>
          <Table
            order={order}
            refundReasons={refundReasons}
            showTotal={false}
            headless
          />
        </AmountWrapper>
        <Flex direction="column" gap={{ xs: 6, md: 10, lg: 20 }} fullWidth>
          <P1
            text="shippingFrom"
            weight={500}
            color={pallet.text.heading}
            capitalizeFirstLetter
          />
          <AddressWrapper
            gap={{ xs: 5, md: 10 }}
            p={{ xs: 16, md: 24 }}
            align={{ xs: 'start', md: 'center' }}
            fullWidth
          >
            <Flex justify="center" align="center" width="fit-content">
              <Icon
                name="location"
                size={medium ? 24 : 15}
                color={branding.primaryColor}
              />
            </Flex>
            {medium ? (
              <P2
                text={
                  addressBook.find((address) => address.id === addressId)
                    .address_line
                }
                color={pallet.text.heading}
                capitalizeFirstLetter
              />
            ) : (
              <P3
                text={
                  addressBook.find((address) => address.id === addressId)
                    .address_line
                }
                color={pallet.text.heading}
                capitalizeFirstLetter
              />
            )}
          </AddressWrapper>
        </Flex>
        <StepAction
          onClick={() => {
            if (isDropOff) {
              setOpenConfirmModal(true);
            } else {
              handleCompleted(activeStep);
              handleNext();
            }
          }}
          watchedKey="courierId"
        />
      </Flex>
      <ConfirmModal
        open={openConfirmModal}
        heading="dropOffConfirmation"
        description="dropOffDescription"
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={confirmDropOff}
        buttonLabel="yes"
      />
      <Modal
        open={openCarriers}
        disableEscapeKeyDown
        onClose={() => setOpenNoCarriers(false)}
      >
        <NoCarriers
          onConfirm={async (cityId: string) => {
            await post(
              'customer/update-address-city',
              formDataHandler({ city_id: cityId, address_id: addressId }),
            ).then(() => {
              dispatch(
                postShippingCompanies({
                  formData: formDataHandler({
                    address_id: getValues('addressId'),
                    store_id: order?.store.id,
                  }),
                  setLoading: setFetchingShippingCompanies,
                  onEnd: () => setOpenNoCarriers(false),
                }),
              );
            });
          }}
        />
      </Modal>
    </Card>
  );
}
