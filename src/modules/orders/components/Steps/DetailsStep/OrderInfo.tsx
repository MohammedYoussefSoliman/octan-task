/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Icon,
  Checkbox,
  Flex,
  Link,
  H6,
  P1,
  P2,
  P3,
  YesNoConfirmModal,
} from '@/components';
import { useStepperApi } from '@/components/Stepper';
import { TERMS_CONDITIONS_LINK } from '@/helpers/constants';
import { formDataHandler, splitter } from '@/helpers/functions';
import { CheckOrderForm } from '@/helpers/types';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { OrderStoreType } from '@/state/types';
import { showError } from '@/state/ui-actions/slice';

import { Strong } from '../../../styles';
import StepAction from '../../StepAction';
import { TotalAmountWrapper } from '../../styles';

import ConfirmOtpModal from './ConfirmOtpModal';
import InfoTooltip from './InfoTooltip';
import ItemInfo from './ItemInfo';
import RefundWarning from './RefundWarning';
import { Pricing } from './types';

type Props = {
  shippingInfo?: any;
  selectedItems: any[];
  getOrdersObjectData: (answer?: boolean) => any;
  pricing?: Pricing;
  storeConfirmation: OrderStoreType['confirmation_question'];
  storeAgreementUrl: string;
  storeName: string;
  phoneNumber: string;
};
export default function OrderInfo({
  shippingInfo,
  getOrdersObjectData,
  selectedItems,
  pricing,
  storeConfirmation,
  storeAgreementUrl,
  storeName,
  phoneNumber,
}: Props) {
  const { pallet, colors, branding } = useTheme();
  const { t } = useTranslation('app');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { post } = useAxiosInstance();
  const { getValues, control } = useFormContext<CheckOrderForm>();
  const { addressId, bankAccountId, items } = getValues();
  const { updateActiveStep } = useStepperApi();
  const {
    consumerOrder: {
      addressBook,
      order,
      orderDetails,
      bankAccounts,
      refundReasons,
    },
  } = useAppSelector((state) => state);

  const subscriptionType = lodashGet(
    orderDetails,
    'priceDetails.journey',
    null,
  );

  const isRefundAfter =
    subscriptionType === 'refund_after_delivery' ||
    subscriptionType === 'refund_after_pickup';

  const isBNPL = ['tamara', 'tabby', 'mispay'].includes(
    order?.payment_method as string,
  );

  const isNotShippless = !['shipless', 'slim'].includes(
    lodashGet(order, 'store.store_journey', ''),
  );

  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);
  const [openOTPModal, setOpenOTPModal] = React.useState<boolean>(false);

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const bankInfo = bankAccounts.find((account) => account.id === bankAccountId);

  const addressInfo = addressBook.find((address) => address.id === addressId);

  const send = React.useCallback(
    async (event?: React.ChangeEvent<any>) => {
      event?.preventDefault();
      try {
        await post(
          'customer/send-refund-otp',
          formDataHandler({
            contact_info: phoneNumber,
          }),
        );
      } catch (err) {
        const error = err as any;
        const message = error?.response?.data?.errors[0]?.message;
        dispatch(showError(message));
      }
    },
    [post, phoneNumber, dispatch],
  );

  const submitOrder = React.useCallback(
    async (answer?: boolean) => {
      try {
        const response = await post(
          'customer/orders',
          formDataHandler(getOrdersObjectData(answer)),
        );
        const { is_blocked: isBlocked, message } = lodashGet(
          response.data,
          'records',
          {},
        );
        if (isBlocked) {
          navigate('/orders/failed-order', {
            state: { storeAgreementUrl, storeName, message },
          });
        } else {
          navigate(`/orders/successfully-created?id=${order?.order_number}`);
        }
      } catch (error) {
        if ((error as any).response.data) {
          // dispatch(
          //   showError(
          //     (error as any).response?.data?.errors[0]?.message,
          //     (error as any).response?.data?.errors[0]?.key ===
          //       "error_limit_order"
          //       ? "filled"
          //       : "normal",
          //   ),
          // );

          if (
            (error as any).response?.data?.errors[0]?.key ===
            'error_verification_order'
          ) {
            await send();
            setOpenOTPModal(true);
          } else if (
            (error as any).response?.data?.errors[0]?.key ===
            'file_upload_missing'
          ) {
            updateActiveStep(2);
            dispatch(
              showError(
                (error as any).response?.data?.errors[0]?.message,
                'filled',
              ),
            );
          } else {
            navigate('/orders/failed-order', {
              state: {
                storeAgreementUrl,
                storeName,
                message: (error as any).response?.data?.errors[0]?.message,
              },
            });
          }
        }
      } finally {
        setSubmitting(false);
        setOpenConfirmModal(false);
      }
    },
    [order, selectedItems],
  );

  if (!order) return null;
  return (
    <>
      {selectedItems.length > 1 ? (
        <Flex gap={{ xs: 6, md: 12, lg: 24 }}>
          {selectedItems.map((item, index) => (
            <Flex
              key={item.id}
              className="logo"
              align="center"
              justify="center"
            >
              <img
                className="logo--image"
                src={item?.image?.url}
                alt="item_image"
              />
              <Flex align="center" justify="center" className="logo--order">
                <P3
                  text={String(index + 1)}
                  color={colors.shades[100]}
                  weight={600}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : selectedItems.length === 1 ? (
        <Flex className="logo" align="center" justify="center">
          {selectedItems[0]?.image?.url ? (
            <img
              className="logo--image"
              src={selectedItems[0]?.image?.url}
              alt="item_image"
            />
          ) : (
            <Icon name="grey-logo-shape" size={60} />
          )}
        </Flex>
      ) : null}
      <Flex direction="column" gap={{ xs: 6, md: 10, lg: 15 }} fullWidth>
        <P1
          text="orderInfo"
          color={pallet.text.heading}
          weight={600}
          capitalizeFirstLetter
        />
        <Flex
          className="refund--paper"
          p={{ xs: 12, md: 20, lg: 40 }}
          direction={{ xs: 'column', md: 'row' }}
          gap={{ xs: 6, md: 12, lg: 24 }}
          fullWidth
        >
          <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} flex={1}>
            <ItemInfo label="storeName" value={order.store.name} />
            <ItemInfo label="orderNumber" value={String(order.order_number)} />
            {lodashGet(pricing, 'total.value') && (
              <ItemInfo
                label="totalPrice"
                value={lodashGet(pricing, 'total.value', '')}
              />
            )}
            <ItemInfo
              label="items"
              value={selectedItems.map((item) => item.name)}
            />
          </Flex>
          <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} flex={1}>
            <ItemInfo
              label="reason"
              value={items
                .filter((item) => item.checked)
                .map((item) => {
                  const reason =
                    refundReasons.find((re) => re.id === item.reason_id)
                      ?.name || '';
                  return reason;
                })}
            />
            {isNotShippless && (
              <>
                <ItemInfo
                  label="shippingFrom"
                  value={addressInfo.address_line}
                />
                <ItemInfo
                  label="refundAmount"
                  value={lodashGet(pricing, 'finalPrice.value', '')}
                  isPrice
                />
              </>
            )}
          </Flex>
        </Flex>
        {isNotShippless && (
          <>
            <P1
              text="courierInfo"
              color={pallet.text.heading}
              weight={600}
              capitalizeFirstLetter
            />
            <Flex
              className="refund--paper"
              p={8}
              pe={32}
              align="center"
              gap={{ xs: 6, md: 12, lg: 24 }}
              justify="space-between"
              fullWidth
            >
              <Flex align="center" gap={{ xs: 6, md: 10, lg: 20 }}>
                <Flex
                  className="shipping--logo"
                  align="center"
                  justify="center"
                >
                  <img
                    className="shipping--logo__image"
                    src={shippingInfo.logo}
                    alt="item_image"
                  />
                </Flex>
                <P3
                  text={shippingInfo.deliveryOptionName}
                  color={pallet.text.heading}
                  capitalizeFirstLetter
                />
              </Flex>
              <P2
                text={`${shippingInfo.price} ${order.currency}`}
                color={branding.primaryColor ?? pallet.primary[500]}
                weight={500}
                capitalizeFirstLetter
              />
            </Flex>
          </>
        )}
        <P1
          text="bankInfo"
          color={pallet.text.heading}
          weight={600}
          capitalizeFirstLetter
        />
        <Flex
          className="refund--paper"
          p={{ xs: 12, md: 20, lg: 40 }}
          direction={{ xs: 'column', md: 'row' }}
          gap={{ xs: 6, md: 12, lg: 24 }}
          fullWidth
        >
          <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} flex={1}>
            <ItemInfo
              label="accountHolderName"
              value={`${bankInfo.first_name} ${
                bankInfo.middle_name ? bankInfo.middle_name : ''
              } ${bankInfo.last_name}`}
            />
          </Flex>
          <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} flex={1}>
            <ItemInfo label="bankName" value={bankInfo.bank.name} />
          </Flex>
          <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} flex={1}>
            <ItemInfo
              label="iban"
              value={splitter({
                phrase: bankInfo.iban,
                splitAt: 4,
              }).join(' ')}
            />
          </Flex>
        </Flex>
      </Flex>
      {isNotShippless &&
        (isRefundAfter || isBNPL ? (
          <Flex
            fullWidth
            align="center"
            justify="center"
            direction="column"
            gap={16}
          >
            <Flex
              gap={{ xs: 2, md: 4, lg: 8 }}
              fullWidth
              align="center"
              justify="center"
              withWrap
            >
              <P1
                textAlign="center"
                color={pallet.text.heading}
                weight={500}
                capitalizeFirstLetter
              >
                <Trans
                  i18nKey="refundProductNotice"
                  t={t}
                  values={{
                    price: lodashGet(pricing, 'finalPrice.value', ''),
                  }}
                  components={{ strongPrice: <Strong>placeholder</Strong> }}
                />
              </P1>
              <InfoTooltip
                total={lodashGet(pricing, 'total.value', '')}
                deduction={lodashGet(pricing, 'deduction')}
                addition={lodashGet(pricing, 'addition')}
                refundAmount={lodashGet(pricing, 'finalPrice.value', '')}
              />
            </Flex>
            <RefundWarning pricing={pricing} storeName={storeName} />
          </Flex>
        ) : (
          <TotalAmountWrapper
            fullWidth
            align="center"
            justify="center"
            direction="column"
          >
            <Flex
              gap={{ xs: 6, md: 8, lg: 16 }}
              justify="center"
              align="center"
              withWrap
            >
              <P1
                text="totalRefundAmount"
                endAdornment=":"
                color={pallet.text.heading}
                weight={500}
                capitalizeFirstLetter
              />
              <H6
                text={lodashGet(pricing, 'finalPrice.value', '')}
                color={branding.primaryColor ?? pallet.primary[600]}
              />
              <InfoTooltip
                total={lodashGet(pricing, 'total.value', '')}
                deduction={lodashGet(pricing, 'deduction', [])}
                addition={lodashGet(pricing, 'addition', [])}
                refundAmount={lodashGet(pricing, 'finalPrice.value', '')}
              />
            </Flex>
          </TotalAmountWrapper>
        ))}
      <Flex
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: 6 }}
        justify="flex-start"
        align={{ xs: 'flex-start', md: 'center' }}
        fullWidth
      >
        <Checkbox
          control={control}
          name="agreedToTerms"
          label="agreedToTerms"
          fillColor={branding.primaryColor ?? pallet.primary[600]}
        />
        <Link
          to={
            process.env.NODE_ENV === 'production'
              ? TERMS_CONDITIONS_LINK.prod
              : TERMS_CONDITIONS_LINK.dev
          }
          relative={false}
        >
          <P2
            text="termsAndConditions"
            color={branding.primaryColor ?? pallet.primary[600]}
            weight={500}
            hover={{ decoration: 'underline' }}
          />
        </Link>
      </Flex>
      <StepAction
        isLoading={submitting}
        label="submitRequest"
        watchedKey="agreedToTerms"
        onClick={
          storeConfirmation
            ? () => setOpenConfirmModal(true)
            : async () => {
                setSubmitting(true);
                await submitOrder();
                setSubmitting(false);
              }
        }
      />
      <YesNoConfirmModal
        open={openConfirmModal}
        heading={storeConfirmation?.question}
        onClose={() => {
          setSubmitting(true);
          submitOrder(true);
        }}
        onConfirm={async () => {
          setSubmitting(true);
          submitOrder(false);
        }}
      />
      <ConfirmOtpModal
        open={openOTPModal}
        onClose={() => setOpenOTPModal(false)}
        submitOrder={async () => {
          await submitOrder();
        }}
        phoneNumber={phoneNumber}
        storeAgreementUrl={storeAgreementUrl}
        storeName={storeName}
      />
    </>
  );
}
