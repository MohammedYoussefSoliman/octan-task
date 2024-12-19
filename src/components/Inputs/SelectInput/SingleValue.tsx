import { useTheme } from '@emotion/react';
import { SingleValueProps, components } from 'react-select';

import { P1 } from '@/components/Typography';

import { OptionType } from './types';

export default function SingleValue({
  children,
  ...props
}: SingleValueProps<OptionType, true>) {
  const { pallet } = useTheme();

  return (
    <components.SingleValue {...props}>
      {typeof children === 'string' ? (
        <P1
          text={children}
          color={pallet.text.heading}
          weight={500}
          capitalizeFirstLetter
        />
      ) : (
        children
      )}
    </components.SingleValue>
  );
}
