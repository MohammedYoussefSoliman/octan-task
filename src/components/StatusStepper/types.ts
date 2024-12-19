import { RefundStatus } from '@/helpers/types';

export type ReturnVariant = {
  name: string;
  iconUrl: string;
  statusText: string;
  state: RefundStatus['state'];
};

export type OrderState = 'pending' | 'completed' | 'current';

export type Status = {
  orderState: OrderState;
  orderStatus: 'submitted' | 'shipping' | 'store-review' | 'completed';
};

export type StatusStepper = {
  steps: Status[];
};

export type StatusStep = {
  iconUrl: string;
  state: RefundStatus['state'];
  isCurrent: boolean;
  statusText: string;
};
