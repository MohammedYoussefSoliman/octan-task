import fetchStores from '@/assets/data/fetchStores';
import AsyncLabel from '@/components/Inputs/SelectInput/AsyncLabel';
import { AsyncOptionType } from '@/components/Inputs/SelectInput/types';
import serviceInstance from '@/services/instance';

export const filterOptions = (
  inputValue: string,
  options: AsyncOptionType[],
) => {
  return options.filter((i) =>
    i.stringLabel.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

export const loadOptions = async (
  inputValue: string,
  callback: (options: AsyncOptionType[]) => void,
): Promise<AsyncOptionType[]> => {
  const data = await fetchStores();
  const options: AsyncOptionType[] = (data as unknown as any[]).map(
    (option) => ({
      label: <AsyncLabel label={option.title} logo={option.logo} />,
      stringLabel: option.title,
      value: option.id,
    }),
  );
  callback(filterOptions(inputValue, options));
  return options;
};

export const loadStores = async (
  inputValue: string,
  callback: (options: AsyncOptionType[]) => void,
): Promise<AsyncOptionType[]> => {
  const { data } = await serviceInstance.get('/stores');
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
