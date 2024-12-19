import { CSSProperties } from 'react';

import { css } from '@emotion/react';
import _ from 'lodash';

import configs, { borderRadiusConfigs, sizes } from './configs';
import resolveColor from './resolveButtonColor';
import { ButtonVariant } from './types';

export const resolveButtonConfig = (
  variant: ButtonVariant = 'primary',
  size: 'lg' | 'md' | 'sm' = 'md',
  disabled = false,
  color: CSSProperties['color'] | undefined = undefined,
  borderRadius: 'sm' | 'md' | 'lg' | 'full' = 'full',
) => {
  const colorStyles = color ? resolveColor(color, variant) : {};
  const { button } = configs;
  const { styles } = button[variant];
  const hoverStyles = !disabled ? button[variant].hoverStyles : {};
  const disabledStyles = disabled ? button[variant].disabled : {};
  const sizeStyles = sizes.button[size].styles;
  const borderRadiusStyles = borderRadiusConfigs[borderRadius];
  return css({
    ...styles,
    ...sizeStyles,
    ...disabledStyles,
    ...colorStyles?.styles,
    ...borderRadiusStyles,
    '&:hover': colorStyles?.hoverStyles || hoverStyles,
    '&:disabled': colorStyles?.disabled,
  });
};

export const resolveIconButtonConfig = (
  variant: ButtonVariant = 'primary',
  size: 'lg' | 'md' | 'sm' = 'md',
  disabled = false,
  color: CSSProperties['color'] | undefined = undefined,
  borderRadius: 'sm' | 'md' | 'lg' | 'full' = 'full',
) => {
  const colorStyles = color ? resolveColor(color, variant) : {};
  const { button } = configs;
  const { iconButton } = sizes;
  const { styles } = button[variant];
  const hoverStyles = !disabled ? button[variant].hoverStyles : {};
  const disabledStyles = disabled ? button[variant].disabled : {};
  const sizeStyles = iconButton[size].styles;
  const borderRadiusStyles = borderRadiusConfigs[borderRadius];

  return css({
    ...styles,
    ...sizeStyles,
    ...disabledStyles,
    '&:hover': !_.isEmpty(colorStyles) ? colorStyles.hoverStyles : hoverStyles,
    ...colorStyles?.styles,
    ...colorStyles?.disabled,
    ...borderRadiusStyles,
  });
};
