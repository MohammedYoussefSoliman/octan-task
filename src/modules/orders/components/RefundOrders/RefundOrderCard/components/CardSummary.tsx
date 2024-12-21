import { Flex } from '@/components/Grids';
import resolveStatus from '@/components/StatusStepper/utils/resolveStatus';
import { Order } from '@/helpers/types';

import RefundOrderCardLeft from './RefundOrderCardLeft';
import RefundOrderCardRight from './RefundOrderCardRight';

type Props = {
  expanded: boolean;
  toggleExpanded: () => void;
  order: Order;
};

export default function CardSummary({
  expanded,
  toggleExpanded,
  order,
}: Props) {
  const orderStatus = order.status_log.find((status) => status.isCurrent);
  const statusVariant = orderStatus
    ? resolveStatus(
        orderStatus.variant,
        orderStatus.name,
        orderStatus.icon,
        orderStatus.statusText,
        orderStatus.state,
      )
    : undefined;
  return (
    <Flex
      direction="row"
      justify="space-between"
      gap={{ xs: 16, md: 21 }}
      fullWidth
    >
      <RefundOrderCardLeft
        orderId={order.id}
        storeName={order.store.name}
        storeLogo={{
          src: order.store.logo,
          alt: order.store.name,
        }}
        orderNumber={order.order_number}
        price={order.final_amount}
        statusVariant={statusVariant}
      />
      <RefundOrderCardRight
        expanded={expanded}
        toggleExpanded={toggleExpanded}
        itemsCount={order.items.length}
      />
    </Flex>
  );
}
