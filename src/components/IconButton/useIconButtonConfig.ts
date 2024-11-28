import React from 'react';

import { cn } from '@/utils';

import type { IconButtonProps } from './IconButtons.types';

import {
  defaultClasses,
  variantsConfig,
  sizeConfig,
  iconColors,
} from './IconButton.config';

const useIconButtonConfig = ({
  variant,
  fill,
  size,
  isLoading,
  disabled,
  className,
}: Pick<
  IconButtonProps,
  'variant' | 'fill' | 'size' | 'isLoading' | 'disabled' | 'className'
>) => {
  const classes = React.useMemo(
    () =>
      cn([
        ...defaultClasses,
        ...variantsConfig[variant || 'primary'][
          disabled || isLoading ? 'disabled' : 'fill'
        ][fill || 'filled'],
        ...sizeConfig[size || 'md'],
        className,
      ]),
    [disabled, fill, isLoading, size, variant, className],
  );

  const iconColor =
    disabled || isLoading
      ? iconColors.disabled.fill.filled
      : iconColors[variant || 'primary'].fill[fill || 'filled'];

  return { classes, iconColor };
};

export default useIconButtonConfig;
