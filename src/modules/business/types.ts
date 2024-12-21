export type AdvantagesItemsType = {
  icon: string;
  title: string;
  description: string;
};

export type AdvantagesType = {
  title: string;
  records: AdvantagesItemsType[];
};

export type TrustedByLogoType = {
  id: string;
  logo: string;
  name: string;
};

export type TrustedByType = {
  title: string;
  logos: TrustedByLogoType[];
};

export type TheFigureItemType = {
  value: string;
  description: string;
};

export type TheFigureType = {
  title: string;
  items: TheFigureItemType[];
};

export type HowItWorksType = {
  image: string;
  caption: string;
};

export type RecordsType = null | {
  title: string;
  description: string;
  trustedBy: TrustedByType;
  banner: string;
  advantages: AdvantagesType;
  theFigure: TheFigureType;
  howItWorks: HowItWorksType[];
};

export default {};
