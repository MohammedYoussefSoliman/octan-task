import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Flex,
  AsyncSelectInput,
  EmailInput,
  LocalizedNumberInput,
  PhoneNumberInput,
} from '@/components';
import AsyncLabel from '@/components/Inputs/SelectInput/AsyncLabel';
import { AsyncOptionType } from '@/components/Inputs/SelectInput/types';
import {
  formDataHandler,
  filterOptions,
  convertArabicDigitsToEnglish,
} from '@/helpers/functions';
import { RefundDataType } from '@/helpers/types';
import { useAppDispatch, useAxiosInstance } from '@/hooks';
import { checkOrders } from '@/state/order/checkOrders';
import { fetchRefundReasons } from '@/state/order/fetchRefundReasons';
import { OrderStoreType } from '@/state/types';

type Props = {
  onClose: () => void;
};

export default function CheckOrderForm({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { get } = useAxiosInstance();
  const { colors } = useTheme();
  const { t } = useTranslation('app');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [stores, setStores] = React.useState<any[]>([]);
  const [store, setStore] = React.useState<OrderStoreType | null>(null);

  const loadStores = React.useCallback(
    async (
      inputValue: string,
      callback: (options: AsyncOptionType[]) => void,
    ): Promise<AsyncOptionType[]> => {
      const { data } = await get('/stores');
      setStores(data.records as any[]);
      const options: AsyncOptionType[] = (data.records as unknown as any[]).map(
        (option) => ({
          label: <AsyncLabel label={option.name} logo={option.logo} />,
          stringLabel: option.name,
          value: option.id,
        }),
      );
      callback(filterOptions(inputValue, options));
      return options;
    },
    [get],
  );

  const onSubmit = React.useCallback(
    async (data: RefundDataType) => {
      dispatch(
        checkOrders({
          formData: formDataHandler({
            email: data.email,
            phone_number: data.phone_number
              ? `${data.dialCode}${data.phone_number}`
              : '',
            store_id: data.store_id,
            order_id: convertArabicDigitsToEnglish(data.order_id),
          }),
          successCallback: async () => {
            await dispatch(
              fetchRefundReasons({
                config: {
                  params: {
                    store_id: data.store_id,
                  },
                },
              }),
            );
            navigate('/create-order');
          },
          setLoading,
        }),
      );
    },
    [dispatch, navigate],
  );

  return (
    <Form
      defaultValues={{
        email: '',
        dialCode: '+966',
      }}
      onSubmit={onSubmit}
    >
      {({ control }) => {
        return (
          <Flex gap={{ xs: 7, md: 15, lg: 30 }} direction="column" fullWidth>
            <AsyncSelectInput
              name="store_id"
              placeholder="selectStore"
              control={control}
              loadOptions={loadStores}
              changeHandler={(value) =>
                setStore(stores.find((opt) => opt.id === value))
              }
            />
            <LocalizedNumberInput
              name="order_id"
              placeholder="orderNumber"
              control={control}
              required
            />
            {store?.verification_method === 'phone_number' ? (
              <PhoneNumberInput
                validationRules={{
                  validate: (value) =>
                    value.charAt(0) === '0'
                      ? t('startWithZeroPhoneNumber')
                      : true,
                  minLength: { value: 9, message: 'phoneMinLength' },
                  maxLength: { value: 9, message: 'phoneMaxLength' },
                }}
                name="phone_number"
                placeholder="5xxxxxxxx"
                control={control}
              />
            ) : (
              <EmailInput name="email" placeholder="email" control={control} />
            )}
            <Flex
              mt={{ xs: 16, md: 24, lg: 32 }}
              justify="space-between"
              gap="32px"
              fullWidth
            >
              <Button
                variant="secondary"
                onClick={onClose}
                color={colors.grey[400]}
                fullWidth
                type="button"
              >
                cancel
              </Button>
              <Button isLoading={loading} fullWidth>
                submit
              </Button>
            </Flex>
          </Flex>
        );
      }}
    </Form>
  );
}
