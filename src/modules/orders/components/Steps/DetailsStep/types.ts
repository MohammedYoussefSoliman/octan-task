export type PricingObject = {
  key: string;
  title: string;
  value: string;
};

export type Pricing = {
  addition: PricingObject[];
  deduction: PricingObject[];
  finalPrice: PricingObject;
  total: PricingObject;
};
