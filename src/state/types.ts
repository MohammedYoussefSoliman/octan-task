import { SnackbarOrigin } from '@mui/material';

import { FormValidationRules } from '@/components/Inputs/types';

import { LayoutType } from '@/layout/layout.types';

export type UserType = {
  roles: string[];
  permissions: { [key: string]: boolean };
  first_name: string;
  last_name: string;
  id?: number;
  phone_number: string;
  date_of_birth?: string;
  status?: boolean;
  national_id?: string;
  avatar?: string;
  customer_names: {
    ar: {
      firstName: string;
      secondName: string;
      thirdName: string;
      lastName: string;
    };
    en: {
      firstName: string;
      secondName: string;
      thirdName: string;
      lastName: string;
    };
  };
};

export type AuthState = {
  token: {
    value: string;
    expirationDate: Date;
  } | null;
  rememberMe: boolean;
  user: UserType;
  fireBaseToken: string;
  updateNationalId?: boolean;
  nafathVerificationStatus: 'initial' | 'required' | 'verified';
  requireNafathStep: boolean;
};

export type GlobalState = {
  message: any | null;
  type: 'info' | 'error' | 'maintenance';
};

export type SnackbarType = {
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  message: string | null;
  status?: 'success' | 'failure' | 'info';
  type: 'normal' | 'filled';
};

export type UIState = {
  mode: 'dark' | 'light';
  language: 'en' | 'ar';
  layout: LayoutType;
  headerVariant: 'white' | 'transparent';
  brandingDetails: {
    isEnabled: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    logo: {
      image?: string;
      url?: string;
    };
  };
};

export type UIActionsState = {
  snackbar: SnackbarType;
  modals: string[];
  localStep: number;
  orderCheckAuth: 'natural' | 'failed' | 'success';
  authMode: 'modal' | 'page';
};

export type ItemImageType = {
  id: number;
  product_id: number;
  position: number;
  alt: string | null;
  height: number;
  url: string;
  width: number;
};

export type StorePackage = {
  actual_price: {
    amount: number;
    currency: string;
  };
  id: string;
  image: string;
  name: string;
  refundable: boolean;
  refundable_text: string;
};

export type OrderItemType = {
  id: number;
  gift: boolean;
  image: ItemImageType;
  images: ItemImageType[];
  name: string;
  price: string;
  final_price: string;
  product_id: number;
  quantity: number;
  refundable: boolean;
  title: string;
  total_discount: string;
  variant_id: number;
  variant_title: string;
  vendor: string;
  store_package: StorePackage;
};

export type OrderStoreType = {
  id: string;
  name: string;
  website: string;
  verification_method: string;
  agreement_url: string;
  logo: string;
  store_provider_name: string;
  subscription_type: string | null;
  confirmation_question: {
    id: number;
    question: string;
    status: boolean;
  } | null;
};

export type OrderType = {
  order_id: number;
  order_number: number;
  subtotal_price: string;
  total_discounts_price: string;
  total_price: string;
  total_tax: string;
  currency: string;
  items: OrderItemType[];
  store: OrderStoreType;
  phone_number: string;
  payment_method: string;
};

export type ShippingType = {
  serviceTyp: string;
  deliveryOptionName: string;
  drop_off: boolean;
  trackingType: string;
  codCharge: number;
  maxOrderValue: number;
  insurancePolicy: string;
  maxCODValue: number;
  deliveryOptionId: number;
  extraWeightPerKg: number;
  deliveryCompanyName: string;
  pickupCutoffTime: string | null;
  avgDeliveryTime: string;
  returnFee: number;
  maxFreeWeight: number;
  logo: string;
  price: number;
  pickupDropoff: string;
};

type SubPrice = {
  title: string;
  value: string;
  key: string;
};

export type PricingDetailsType = {
  order_number: string;
  pricing: {
    total: SubPrice;
    addition: SubPrice[];
    deduction: SubPrice[];
    finalPrice: SubPrice;
  };
};

export type ShippingDetailsType = ShippingType[];

export type ReturnReasonsRule = {
  name: string;
  type: string;
  validations: Omit<FormValidationRules, 'validate'>[];
};

export type RefundReasonsType = {
  id: number;
  name: string;
  rules?: ReturnReasonsRule[];
};
