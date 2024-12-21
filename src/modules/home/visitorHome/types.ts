export type HowItWorksTitleType = { title: string; description: string };

export type HowItWorksType = { image: string; caption: string };

export type StatisticsType = {
  operationsCount: number;
  satisfiedCustomers: number;
  successfulRefunds: number;
};

export type ImageStepsType = { image: string; caption: string };

export type BannerType = {
  buttonLabel: string;
  description: string;
  image: string;
  title: string;
};

export type StepsType = {
  imageSteps: ImageStepsType[];
  title: string;
};

export type RecordsType = null | {
  banner: BannerType;
  howItWorks: HowItWorksType[];
  howItWorksTitle: HowItWorksTitleType;
  statistics: StatisticsType;
  steps: StepsType;
  title: string;
  welcomeStatus: string;
};
