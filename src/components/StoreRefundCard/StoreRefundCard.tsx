import React from 'react';

import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Form,
  Button,
  H5,
  Logo,
  StoreLogo,
  PoweredByYamm,
} from '@/components';
import {
  EmailInput,
  LocalizedNumberInput,
  PhoneNumberInput,
} from '@/components/Inputs';
import {
  convertArabicDigitsToEnglish,
  formDataHandler,
} from '@/helpers/functions';
import { RefundDataType } from '@/helpers/types';
import { useAppDispatch } from '@/hooks';
import { checkOrders } from '@/state/order/checkOrders';
import { fetchRefundReasons } from '@/state/order/fetchRefundReasons';

import {
  StyledRefundCard,
  UnbrandedLogoWrapper,
} from './StoreRefundCard.styles';
import { StoreRefundCardProps } from './StoreRefundCard.types';

function StoreRefundCard({ storeData, storeFormData }: StoreRefundCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    branding: { isEnabled: isBranded, logo, primaryColor },
  } = useTheme();

  const onSubmit = React.useCallback(
    async (data: RefundDataType) => {
      setLoading(true);
      dispatch(
        checkOrders({
          formData: formDataHandler({
            email: data.email,
            phone_number: data.phone_number
              ? `${data.dialCode}${data.phone_number}`
              : undefined,
            store_id: storeData?.storeId,
            order_id: convertArabicDigitsToEnglish(data.order_id),
          }),
          successCallback: async () => {
            await dispatch(
              fetchRefundReasons({
                config: {
                  params: {
                    store_id: storeData?.storeId,
                  },
                },
                onSuccess() {
                  setLoading(false);
                  navigate('/create-order');
                },
                onEnd() {
                  setLoading(false);
                },
              }),
            );
          },
          onFailure() {
            setLoading(false);
          },
        }),
      );
    },
    [dispatch, navigate, storeData?.storeId],
  );

  React.useEffect(() => {
    if (storeData && storeData.orderId) {
      onSubmit({
        dialCode: '+966',
        store_id: storeData?.storeId || '',
        ...storeFormData,
      });
    }
  }, [onSubmit, storeData, storeFormData]);

  return (
    <StyledRefundCard
      direction="column"
      gap={{ xs: 7, md: 15, lg: 30 }}
      fullWidth
    >
      {isBranded ? (
        <Flex align="center" justify="center" fullWidth>
          <StoreLogo
            url={logo?.url ?? ''}
            image={logo?.image ?? ''}
            alt={storeData?.storeName}
          />
        </Flex>
      ) : (
        <Flex align="center" justify="center" fullWidth>
          <Logo size={120} />
        </Flex>
      )}
      <H5 className="title" text="enterRefundDetails" textAlign="center" />
      <Form
        defaultValues={{
          dialCode: '+966',
          store_id: storeData?.storeId,
          ...storeFormData,
        }}
        onSubmit={onSubmit}
      >
        {({ control }) => {
          return (
            <Flex
              gap={{ xs: 8, md: 16 }}
              mb={isBranded ? 0 : 20}
              direction="column"
              fullWidth
            >
              {!isBranded && (
                <UnbrandedLogoWrapper justify="center" align="center" fullWidth>
                  <StoreLogo
                    url={logo?.url ?? ''}
                    image={logo?.image ?? ''}
                    alt={storeData?.storeName}
                  />
                </UnbrandedLogoWrapper>
              )}
              <LocalizedNumberInput
                name="order_id"
                placeholder="orderNumber"
                control={control}
                color={primaryColor}
                required
              />

              {storeData?.verificationMethod === 'phone_number' ? (
                <PhoneNumberInput
                  name="phone_number"
                  placeholder="phoneNumberPlaceholder"
                  control={control}
                  color={primaryColor}
                  validationRules={{
                    minLength: { value: 9, message: 'phoneMinLength' },
                    maxLength: { value: 9, message: 'phoneMaxLength' },
                  }}
                />
              ) : (
                <EmailInput
                  name="email"
                  placeholder="storeEmailAddress"
                  color={primaryColor}
                  control={control}
                />
              )}
              <Button
                isLoading={loading}
                fullWidth
                size="md"
                color={primaryColor}
                borderRadius="md"
              >
                refundFormSubmit
              </Button>
            </Flex>
          );
        }}
      </Form>
      {isBranded && <PoweredByYamm color={primaryColor} />}
    </StyledRefundCard>
  );
}

export default StoreRefundCard;
