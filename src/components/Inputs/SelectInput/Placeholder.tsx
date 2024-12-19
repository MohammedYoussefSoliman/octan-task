import { PlaceholderProps, components } from 'react-select';

import { P3 } from '@/components/Typography';

import { OptionType } from './types';

export default function Placeholder(props: PlaceholderProps<OptionType, true>) {
  const { children } = props;
  return (
    <components.Placeholder {...props}>
      {typeof children === 'string' ? (
        <P3 text={children} capitalizeFirstLetter weight={300} />
      ) : (
        children
      )}
    </components.Placeholder>
  );
}
