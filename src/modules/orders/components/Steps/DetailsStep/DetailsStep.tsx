import React from 'react';

import lodashGet from 'lodash/get';
import { useFormContext } from 'react-hook-form';

import { Card } from '@/components';
import { prepareItemsObject, scrollToTop } from '@/helpers/functions';
import { CheckOrderForm } from '@/helpers/types';
import { useAppSelector } from '@/hooks';
import { useSelectedItems } from '@/modules/orders/hooks';

import CancellationOrderInfo from './CancellationOrderInfo';
import OrderInfo from './OrderInfo';
import Wrapper from './styles';

export default function DetailsStep() {
  const { getValues } = useFormContext<CheckOrderForm>();
  const { selectedItems } = useSelectedItems();
  const {
    order,
    bankAccounts,
    orderDetails: { shippingDetails, priceDetails },
  } = useAppSelector((state) => state.consumerOrder);
  const isNotShippless = !['shipless', 'slim'].includes(
    lodashGet(order, 'store.store_journey', ''),
  );
  const isCancellation = lodashGet(order, 'is_cancellation');

  const storeConfirmation = lodashGet(
    order,
    'store.confirmation_question',
    null,
  );
  const { addressId, bankAccountId, courierId } = getValues();

  const bankInfo = bankAccounts.find((account) => account.id === bankAccountId);

  const getOrdersObjectData = React.useCallback(
    (answer?: boolean) => {
      let confirmationData = {};
      let ordersObject = {
        ...prepareItemsObject(selectedItems),
        order_number: order?.order_number,
        store_id: order?.store.id,
        bank_account_id: bankInfo.id,
        customer_address_id: addressId,
        delivery_option_id: courierId,
      };
      if (lodashGet(storeConfirmation, 'id')) {
        confirmationData = {
          confirmation_question_id: lodashGet(storeConfirmation, 'id'),
          answer_confirmation_question: answer ? 1 : 0,
        };
      }
      ordersObject = { ...ordersObject, ...confirmationData };

      return ordersObject;
    },
    [
      addressId,
      bankInfo.id,
      courierId,
      order?.order_number,
      order?.store.id,
      selectedItems,
      storeConfirmation,
    ],
  );

  React.useEffect(() => {
    scrollToTop(200);
  }, []);

  return (
    <Card heading="refundDetails">
      <Wrapper
        mt={10}
        direction="column"
        gap={{ xs: 10, md: 20, lg: 40 }}
        fullWidth
      >
        {isCancellation ? (
          <CancellationOrderInfo
            selectedItems={selectedItems}
            pricing={priceDetails?.pricing || undefined}
            getOrdersObjectData={getOrdersObjectData}
            storeAgreementUrl={lodashGet(order, 'store.agreement_url', '')}
            storeName={lodashGet(order, 'store.name', '')}
            phoneNumber={lodashGet(order, 'phone_number', '')}
          />
        ) : (
          <OrderInfo
            shippingInfo={
              isNotShippless && shippingDetails ? shippingDetails[0] : undefined
            }
            selectedItems={selectedItems}
            pricing={priceDetails?.pricing || undefined}
            getOrdersObjectData={getOrdersObjectData}
            storeConfirmation={storeConfirmation}
            storeAgreementUrl={lodashGet(order, 'store.agreement_url', '')}
            storeName={lodashGet(order, 'store.name', '')}
            phoneNumber={lodashGet(order, 'phone_number', '')}
          />
        )}
      </Wrapper>
    </Card>
  );
}
