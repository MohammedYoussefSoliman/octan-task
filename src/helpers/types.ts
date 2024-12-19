/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderStoreType } from '@/state/types';

export type RefundDataType = {
  store_id: string;
  order_id: string;
  email: string;
  phone_number: number | string;
  dialCode: string;
};

export type CheckOrderItem = {
  id: number;
  quantity: number;
  reason_id?: number;
  variant_id?: number;
  checked: boolean;
  requiredText?: string;
  requiredImage?: string;
  files?: {
    file: File;
    id: string;
    url?: string;
  };
};

export type CheckOrderForm = {
  order_number: number;
  store_id: string;
  agreement_id?: number;
  items: CheckOrderItem[];
  addressId: string;
  courierId: string;
  refundMethod: string;
  bankId?: string;
  bankAccountId: string;
  agreedToTerms: boolean;
  shippingCompany: any;
  rememberMe: boolean;
};

export type StatusType = 'pending' | 'accepted' | 'mixed' | 'rejected';

export type Item = {
  id: string;
  product_id: string;
  reason: string;
  sku: string;
  return_status: 'pending' | 'accepted' | 'rejected';
  reject_reason: string;
  name: string;
  quantity: number;
  price: number;
  refund_id: string;
  refundable: boolean;
  is_accepted: boolean;
  return_reason: {
    id: string;
    name: string;
  };
  images: {
    url: string;
    id: string;
  }[];
  [key: string]: any;
};

export type OrderFormItem = {
  itemId: string;
  status_text: string;
  status_reason?: string;
  file?: string;
};

export type ShipmentType = {
  id: string;
  company_name: string;
  company_logo: string;
  shipment_number: string;
  order_number: string;
  status: string;
  cost: number;
  delivery_time: string;
  policy_url: string | null;
  customer_address: {
    id: string;
    country: string;
    state: string;
    city: string;
    address_line: string;
    latitude: number;
    longitude: number;
  };
};

export type BankInfo = {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  iban: string;
  customer_id: string;
  bank: {
    id: string;
    name: string;
    logo: string;
    min_refund_amount: number;
    max_refund_amount: number;
  };
};

export type ResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: any[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

type State = null | 'success' | 'failure' | 'mixed' | 'passed';

export type RefundStatus = {
  // ex "submitted" | "refunded" | "waiting-shipping" | "shipped"
  name: string;
  /**
   * if the status has different states this state will be displayed
   * Ex: "waiting-shipping" has two states "shipping overdue" | "waiting-shipping"
   */
  variant:
    | {
        name: string;
        icon: string;
        state?: State;
        statusText?: string;
        statusDescription?: string;
      }
    | string
    | null;
  state: State;
  icon: string;
  isCurrent: boolean;
  statusDescription: string | null;
  statusText: string;
  statusInfo: {
    [key: string]: any;
  } | null;
};

export type Order = {
  id: string;
  yamm_id: string;
  order_number: string;
  store: OrderStoreType;
  amount: number;
  deduction: number;
  final_amount: number;
  status_log: RefundStatus[];
  items: Item[];
  shipment: ShipmentType;
  bank_account: BankInfo;
  [key: string]: any;
};

export type StoreData = {
  storeId?: string;
  storeName?: string;
  verificationMethod?: string;
  subscriptionMethod?: string;
  storeJourney?: string;
  orderId?: string;
  email?: string;
  phoneNumber?: number;
};
