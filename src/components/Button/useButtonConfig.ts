import React from 'react';

import { cn } from '@/utils';

import type { ButtonProps } from './Buttons.types';

import {
  defaultClasses,
  focused,
  iconColors,
  sizeConfig,
  variantsConfig,
  widthConfig,
} from './Button.config';

const useButtonConfig = ({
  variant,
  fill,
  size,
  width,
  isLoading,
  disabled,
  className,
  isFocused,
}: Pick<
  ButtonProps,
  | 'variant'
  | 'fill'
  | 'size'
  | 'width'
  | 'isLoading'
  | 'disabled'
  | 'isFocused'
  | 'className'
>) => {
  const classes = React.useMemo(
    () =>
      cn([
        ...defaultClasses,
        ...variantsConfig[variant || 'primary'][
          disabled || isLoading ? 'disabled' : 'fill'
        ][fill || 'filled'],
        ...sizeConfig[size || 'md'],
        widthConfig[width || 'fit'],
        className,
        isFocused && focused[variant || 'primary'][fill || 'filled'],
      ]),
    [variant, disabled, isLoading, fill, size, width, isFocused, className],
  );

  const iconColor =
    disabled || isLoading
      ? iconColors.disabled.fill.filled
      : iconColors[variant || 'primary'].fill[fill || 'filled'];

  return { classes, iconColor };
};

export default useButtonConfig;
