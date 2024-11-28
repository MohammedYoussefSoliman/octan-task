import { icons } from 'lucide-react';

import { IconProps } from './Icon.types';

export default function Icon({
  name,
  iconFill = 'outlined',
  ...rest
}: IconProps) {
  const SelectedIcon = icons[name];

  return (
    <SelectedIcon
      {...rest}
      fill={iconFill === 'filled' ? 'currentColor' : 'none'}
    />
  );
}
