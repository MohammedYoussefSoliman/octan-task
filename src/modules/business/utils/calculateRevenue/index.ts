import {
  localizedStringToNumber,
  localizedNumberFormatter,
} from '@/helpers/functions';

export type CalculatedRevenues = {
  monthlyRepurchase: string;
  monthlyRevenue: string;
  annualRevenue: string;
};
export type RevenueInputs = {
  monthlySalesVolume: string;
  refundRateValue: string;
  averageOrderValue: string;
};

const fromStringToNumber = (input: string) => {
  const string = input.split(',').join('');
  return Number(string);
};

const calculateRevenue = ({
  monthlySalesVolume,
  refundRateValue,
  averageOrderValue,
}: RevenueInputs): CalculatedRevenues => {
  const monthlySales = fromStringToNumber(monthlySalesVolume);
  const averageOrder = localizedStringToNumber(averageOrderValue);
  const refundRate = localizedStringToNumber(refundRateValue);

  const YAMM_FEE = 5 / 100;
  const monthlyRepurchase =
    ((monthlySales * (refundRate / 100)) / averageOrder) * (30 / 100);
  const monthlyRevenue =
    (averageOrder - averageOrder * 0.1) * monthlyRepurchase -
    monthlySales * (refundRate / 100) * YAMM_FEE;
  const annualRevenue = monthlyRevenue * 12;

  return {
    monthlyRepurchase: monthlyRepurchase.toString(),
    monthlyRevenue: localizedNumberFormatter(monthlyRevenue),
    annualRevenue: localizedNumberFormatter(annualRevenue),
  };
};

export default calculateRevenue;
