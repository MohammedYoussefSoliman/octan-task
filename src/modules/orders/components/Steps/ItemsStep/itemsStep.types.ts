import { OrderItemType, StorePackage } from '@/state/types';

export type PackageItem = {
  type: 'item';
  fieldIndex: number;
  details: OrderItemType;
};

export type OrderPackage = StorePackage & {
  type: 'package';
  items: PackageItem[];
};

export type OrderItems = (OrderPackage | PackageItem)[];
