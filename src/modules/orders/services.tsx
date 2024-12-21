import AsyncLabel from '@/components/Inputs/SelectInput/AsyncLabel';
import { AsyncOptionType } from '@/components/Inputs/SelectInput/types';
import { formDataHandler } from '@/helpers/functions';
import serviceInstance from '@/services/instance';

export const filterOptions = (
  inputValue: string,
  options: AsyncOptionType[],
) => {
  return options.filter((i) =>
    i.stringLabel.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

export const loadReasons = async (
  inputValue: string,
  callback: (options: AsyncOptionType[]) => void,
): Promise<AsyncOptionType[]> => {
  const { data } = await serviceInstance.get('/returnReasons');
  const options: AsyncOptionType[] = (data as unknown as any[]).map(
    (option) => ({
      label: <AsyncLabel label={option.name} logo={option.logo} />,
      stringLabel: option.name,
      value: option.id,
    }),
  );
  callback(filterOptions(inputValue, options));
  return options;
};

export const loadCourier = async (
  inputValue: string,
  callback: (options: AsyncOptionType[]) => void,
): Promise<AsyncOptionType[]> => {
  const { data } = await serviceInstance.get('customer/shippingCompanies');
  const options: AsyncOptionType[] = (data as unknown as any[]).map(
    (option) => ({
      label: <AsyncLabel label={option.name} logo={option.logo} />,
      stringLabel: option.name,
      value: option.id,
    }),
  );
  callback(filterOptions(inputValue, options));
  return options;
};

export const addAddresses = async (formData: { [key: string]: string }) => {
  return serviceInstance.post('customer/addresses', formDataHandler(formData));
};
