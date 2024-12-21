import React from 'react';

import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Icon, Checkbox, Flex, Link, H6, P1, P2, P3 } from '@/components';
import { useStepperApi } from '@/components/Stepper';
import { TERMS_CONDITIONS_LINK } from '@/helpers/constants';
import { formDataHandler, splitter } from '@/helpers/functions';
import { CheckOrderForm } from '@/helpers/types';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { showError } from '@/state/ui-actions/slice';

import StepAction from '../../StepAction';
import { TotalAmountWrapper } from '../../styles';

import InfoTooltip from './InfoTooltip';
import ItemInfo from './ItemInfo';
import { Pricing } from './types';

type Props = {
  selectedItems: any[];
  getOrdersObjectData: (answer?: boolean) => any;
  pricing?: Pricing;
  storeAgreementUrl: string;
  storeName: string;
  phoneNumber: string;
};
export default function OrderInfo({
  getOrdersObjectData,
  selectedItems,
  pricing,
  storeAgreementUrl,
  storeName,
  phoneNumber,
}: Props) {
  const { pallet, colors, branding } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { post } = useAxiosInstance();
  const { getValues, control } = useFormContext<CheckOrderForm>();
  const { bankAccountId, items } = getValues();
  const { updateActiveStep } = useStepperApi();
  const {
    consumerOrder: { order, bankAccounts, refundReasons },
  } = useAppSelector((state) => state);

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const bankInfo = bankAccounts.find((account) => account.id === bankAccountId);

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
          if (
            (error as any).response?.data?.errors[0]?.key ===
            'error_verification_order'
          ) {
            await send();
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
          </Flex>
        </Flex>
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
        onClick={submitOrder}
      />
    </>
  );
}
