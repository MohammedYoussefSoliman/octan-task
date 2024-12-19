import { useTheme } from '@emotion/react';
import { DropdownIndicatorProps, components } from 'react-select';

import { Icon, Spinner } from '@/components';

import { OptionType } from '../types';

const { DropdownIndicator } = components;

type Props = DropdownIndicatorProps<OptionType, true> & {
  loading?: boolean;
};

export default function Dropdown({ loading, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <DropdownIndicator {...rest}>
      {loading ? (
        <Spinner size={30} />
      ) : (
        <Icon name="chevron-down" color={colors.grey[400]} />
      )}
    </DropdownIndicator>
  );
}
