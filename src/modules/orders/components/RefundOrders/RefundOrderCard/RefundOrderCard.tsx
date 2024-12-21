import { Accordion } from '@/components';

import CardDetails from './components/CardDetails';
import CardSummary from './components/CardSummary';
import { RefundOrderCardProps } from './RefundOrderCard.types';

export default function RefundOrderCard({
  order,
  onChange,
  expanded,
}: RefundOrderCardProps) {
  return (
    <Accordion
      variant="order"
      expanded={expanded}
      summary={
        <CardSummary
          order={order}
          toggleExpanded={() => onChange(expanded ? '' : order.id)}
          expanded={expanded}
        />
      }
      details={<CardDetails order={order} />}
    />
  );
}
