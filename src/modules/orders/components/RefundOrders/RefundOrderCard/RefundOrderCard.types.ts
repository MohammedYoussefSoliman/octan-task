import { Order } from '@/helpers/types';

export type RefundOrderCardProps = {
  order: Order;
  expanded: boolean;
  onChange: (val: string) => void;
};
