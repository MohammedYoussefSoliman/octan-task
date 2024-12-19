import { AsyncOptionType } from 'components/Inputs/SelectInput/types';

const filterOptions = (inputValue: string, options: AsyncOptionType[]) => {
  return options.filter((i) =>
    i.stringLabel.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

export default filterOptions;
