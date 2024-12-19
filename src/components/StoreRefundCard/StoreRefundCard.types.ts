import { StoreData } from '@/helpers/types';

export type StoreRefundCardProps = {
  storeData?: StoreData | null;
  storeFormData: {
    order_id: string;
    email: string;
    phone_number: string;
  };
};
