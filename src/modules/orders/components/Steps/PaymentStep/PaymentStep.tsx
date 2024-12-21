import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { Accordion, Card, Flex, Icon, P1 } from '@/components';
import RadioOption from '@/components/Inputs/RadioInput/RadioOption';
import { useStepperApi } from '@/components/Stepper';
import {
  formDataHandler,
  prepareItemsObject,
  scrollToTop,
} from '@/helpers/functions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useSelectedItems } from '@/modules/orders/hooks';
import { getPriceInfo } from '@/state/order/getPriceInfo';

import StepAction from '../../StepAction';

import BankList from './BankList';

export default function PaymentStep() {
  const { pallet, branding } = useTheme();
  const dispatch = useAppDispatch();
  const {
    consumerOrder: { order, bankAccounts },
  } = useAppSelector((state) => state);
  const { selectedItems } = useSelectedItems();
  const { setValue, getValues } = useFormContext();
  const { handleNext } = useStepperApi();
  const { addressId, courierId, bankId } = getValues();
  const [expanded, setExpanded] = React.useState<string>('transfer');
  const [activeValue, setActiveValue] = React.useState<string>(
    getValues('refundMethod'),
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const getOrdersObjectData = React.useCallback(
    (bankInfo: any) => {
      const ordersObject = {
        ...prepareItemsObject(selectedItems),
        order_number: order?.order_number,
        store_id: order?.store.id,
        bank_account_id: bankInfo.id,
        customer_address_id: addressId,
        delivery_option_id: courierId,
      };
      return ordersObject;
    },
    [addressId, courierId, order, selectedItems],
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('refundMethod', e.target.value);
    setActiveValue(e.target.value);
  };

  React.useEffect(() => {
    scrollToTop(200);
  }, []);

  return (
    <Card heading="paymentInformation">
      <Flex
        direction="column"
        align="center"
        gap={{ xs: 10, md: 20, lg: 40 }}
        fullWidth
      >
        <Flex direction="column" gap={{ xs: 9, md: 15, lg: 30 }} fullWidth>
          <P1 text="chooseRefundPaymentMethod" />
          <Accordion
            expanded={expanded === 'transfer'}
            onChange={(value) => {
              if (value) setExpanded('transfer');
              else setExpanded('');
            }}
            summary={
              <Flex align="center" gap={{ xs: 6, md: 12, lg: 24 }}>
                <Flex mr={{ xs: 16, lg: 20 }}>
                  <RadioOption
                    name="refundMethod"
                    value="bankTransfer"
                    activeValue={activeValue}
                    changeHandler={changeHandler}
                  />
                </Flex>
                <Icon
                  name="bank"
                  color={branding.primaryColor ?? pallet.primary[500]}
                />
                <P1
                  text="bankTransfer"
                  weight={activeValue === 'bankTransfer' ? 500 : 400}
                  color={
                    activeValue === 'bankTransfer'
                      ? pallet.text.heading
                      : pallet.text.body
                  }
                  capitalizeFirstLetter
                />
              </Flex>
            }
            details={<BankList branding={branding} />}
          />
        </Flex>
        <StepAction
          onClick={async () => {
            const bankInfo = bankAccounts.find(
              (account) => account.id === bankId,
            );
            dispatch(
              getPriceInfo({
                setLoading,
                formData: formDataHandler(getOrdersObjectData(bankInfo)),
                onSuccess() {
                  handleNext();
                },
              }),
            );
          }}
          isLoading={loading}
          watchedKey="bankId"
        />
      </Flex>
    </Card>
  );
}
