import Select from 'react-select';

import { Flex } from '@/components/Grids';

import InputError from '../InputError';
import InputLabel from '../InputLabel';

import DropdownIndicator from './DropdownIndicator';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import { SelectProps } from './types';
import useSelectStyles from './useSelectStyles';

export default function SelectInput({
  name,
  label,
  options,
  error,
  rounded,
  dense,
  onChange,
  value,
  required,
  placeholder,
  fullHeight,
  ...selectProps
}: SelectProps) {
  const styles = useSelectStyles({
    error: Boolean(error),
    rounded,
    dense,
    fullHeight,
  });

  return (
    <Flex gap={{ xs: 6, md: 8 }} direction="column" flex={1} fullWidth>
      {label && <InputLabel label={label} required={required} />}
      <Select
        name={name}
        placeholder={placeholder}
        styles={styles}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
          Placeholder,
          Option,
          SingleValue,
        }}
        options={options}
        onChange={onChange}
        value={value}
        {...selectProps}
      />
      {error && <InputError error={error} name={name} />}
    </Flex>
  );
}
