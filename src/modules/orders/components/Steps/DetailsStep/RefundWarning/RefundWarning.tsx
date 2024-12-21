import lodashGet from 'lodash/get';

import { useAppSelector } from '@/hooks';

import { Pricing } from '../types';

import WarningComponent from './WarningComponent';

type RefundWarningProps = {
  pricing?: Pricing;
  storeName: string;
};

const subscriptionTypeWarning = {
  refund_after_delivery: 'refundAfterDelivery',
  refund_after_pickup: 'refundAfterPickup',
};

export default function RefundWarning({
  pricing,
  storeName,
}: RefundWarningProps) {
  const { order, orderDetails } = useAppSelector(
    (state) => state.consumerOrder,
  );

  const subscriptionType = lodashGet(
    orderDetails,
    'priceDetails.journey',
    null,
  );

  const isBnpl =
    lodashGet(orderDetails, 'priceDetails.refund_method') === 'BNPL';

  const isRefundAfter =
    subscriptionType === 'refund_after_delivery' ||
    subscriptionType === 'refund_after_pickup';

  if (!order || !subscriptionType) return null;

  if (isBnpl)
    return (
      <WarningComponent
        pricing={pricing}
        storeName={storeName}
        message={subscriptionTypeWarning.refund_after_delivery}
      />
    );

  if (!isRefundAfter) return null;

  return (
    <WarningComponent
      pricing={pricing}
      storeName={storeName}
      message={subscriptionTypeWarning[subscriptionType]}
    />
  );
}
