import React from 'react';

import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Flex,
  FullscreenModal,
  LoadingScreen,
} from '@/components';
import {
  AsyncSelectInput,
  EmailInput,
  LocalizedNumberInput,
  PhoneNumberInput,
} from '@/components/Inputs';
import AsyncLabel from '@/components/Inputs/SelectInput/AsyncLabel';
import { AsyncOptionType } from '@/components/Inputs/SelectInput/types';
import { H5 } from '@/components/Typography';
import {
  convertArabicDigitsToEnglish,
  filterOptions,
  formDataHandler,
} from '@/helpers/functions';
import { RefundDataType, StoreData } from '@/helpers/types';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { setFormItems } from '@/state';
import { fetchRefundReasons } from '@/state';
import { checkOrders } from '@/state/order/checkOrders';
import { OrderStoreType } from '@/state/types';

import RefundIcon from './RefundIcon';
import StyledRefundPaper from './styles';

type Props = {
  storeValues?: StoreData;
  storeIdParam?: string;
  isSelectStoreDisabled?: boolean;
  className?: string;
  handleInvalidStoreId?: () => void;
};

function RefundForm({
  isSelectStoreDisabled,
  className,
  storeValues,
  storeIdParam,
  handleInvalidStoreId,
}: Props) {
  const { language } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { colors, branding } = useTheme();
  const navigate = useNavigate();
  const { get } = useAxiosInstance(language);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [stores, setStores] = React.useState<any[]>([]);
  const [store, setStore] = React.useState<OrderStoreType | null>(null);
  const [selectedStore, setSelectedStore] = React.useState<
    AsyncOptionType | undefined
  >(undefined);

  const handleSelectedStore = React.useCallback(
    (storesOptions: AsyncOptionType[]) => {
      const selectedStoreOption = storesOptions.find(
        (opt: any) => opt.value === storeValues?.storeId,
      );
      setSelectedStore(selectedStoreOption);
      if (!selectedStoreOption && handleInvalidStoreId) handleInvalidStoreId();
    },
    [handleInvalidStoreId, storeValues],
  );

  const loadStores = React.useCallback(
    async (
      inputValue: string,
      callback: (options: AsyncOptionType[]) => void,
    ): Promise<AsyncOptionType[]> => {
      const { data } = await get('/stores');
      const { records } = data;
      dispatch(setFormItems({ items: [] }));

      setStores(records as any[]);
      setStore(
        records.find((record: any) => record.id === storeValues?.storeId),
      );

      const options: AsyncOptionType[] = (records as unknown as any[]).map(
        (option) => ({
          label: <AsyncLabel label={option.name} logo={option.logo} />,
          stringLabel: option.name,
          value: option.id,
        }),
      );
      handleSelectedStore(options);

      callback(filterOptions(inputValue, options));

      return options;
    },
    [get, storeValues, handleSelectedStore, dispatch],
  );

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
            store_id: data.store_id,
            order_id: convertArabicDigitsToEnglish(data.order_id),
          }),
          successCallback: async (checkOrderData) => {
            if (checkOrderData) {
              await dispatch(
                fetchRefundReasons({
                  config: {
                    params: {
                      store_id: data.store_id,
                      cancellation: checkOrderData.records.is_cancellation
                        ? 1
                        : 0,
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
            }
          },
          onFailure() {
            setLoading(false);
          },
        }),
      );
    },
    [dispatch, navigate],
  );

  React.useEffect(() => {
    if (storeValues && selectedStore && storeValues.orderId) {
      onSubmit({
        dialCode: '+966',
        order_id: storeValues.orderId || '',
        store_id: storeValues.storeId || '',
        email: storeValues.email || '',
        phone_number: storeValues.phoneNumber || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore, storeValues]);
  return (
    <StyledRefundPaper
      className={className}
      direction="column"
      gap={{ xs: 7, md: 15, lg: 30 }}
      fullWidth
    >
      <RefundIcon />
      <H5 className="title" text="applyRefund" textAlign="center" />
      <Form
        defaultValues={{
          dialCode: '+966',
          store_id: storeIdParam,
          ...storeValues,
        }}
        onSubmit={onSubmit}
      >
        {({ control }) => {
          return (
            <Flex gap={{ xs: 8, md: 16, lg: 24 }} direction="column" fullWidth>
              <AsyncSelectInput
                isDisabled={isSelectStoreDisabled}
                value={selectedStore}
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
                  name="phone_number"
                  placeholder="phoneNumberPlaceholder"
                  control={control}
                  validationRules={{
                    minLength: { value: 9, message: 'phoneMinLength' },
                    maxLength: { value: 9, message: 'phoneMaxLength' },
                  }}
                />
              ) : (
                <EmailInput
                  name="email"
                  placeholder="storeEmailAddress"
                  control={control}
                />
              )}
              <Button
                isLoading={loading}
                color={
                  branding.isEnabled && branding.primaryColor
                    ? branding.primaryColor
                    : undefined
                }
                fullWidth
              >
                refundFormSubmit
              </Button>
            </Flex>
          );
        }}
      </Form>
      <FullscreenModal open={loading} onClose={() => setLoading(false)}>
        <LoadingScreen background={colors.shades[100]} />
      </FullscreenModal>
    </StyledRefundPaper>
  );
}

export default RefundForm;
