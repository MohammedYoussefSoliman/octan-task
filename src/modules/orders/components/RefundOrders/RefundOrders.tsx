import React from 'react';

import { Order } from '@/helpers/types';

import RefundOrderCard from './RefundOrderCard';
import { RefundOrderCardProps } from './RefundOrderCard/RefundOrderCard.types';

type Props = { orders: Order[] };

export default function RefundOrders({ orders }: Props) {
  const [expanded, setExpanded] = React.useState<string>('');

  return (
    <>
      {orders.map((order) => (
        <RefundOrderCard
          key={order.id}
          expanded={expanded === order.id}
          onChange={(id) => setExpanded(id)}
          order={order as unknown as RefundOrderCardProps['order']}
        />
      ))}
    </>
  );
}
