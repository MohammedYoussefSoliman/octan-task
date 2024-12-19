import { useTheme } from '@emotion/react';

import { Icon, Spinner } from '@/components';
import { useBreakpoints } from '@/hooks';

import configs, { sizes } from '../configs';
import { StyledIconButton } from '../styles';
import { IconButtonType } from '../types';

export function IconButton({
  icon,
  onClick,
  className,
  isLoading,
  disabled,
  iconSize,
  iconColor,
  variant = 'primary',
  size = 'lg',
  borderRadius = 'full',
  ...rest
}: IconButtonType) {
  const { iconButton } = sizes;
  const { large, medium } = useBreakpoints();

  const { sm, md, lg } = iconButton[size].iconSize;
  const { colors, branding } = useTheme();

  return (
    <StyledIconButton
      disabled={isLoading || disabled}
      className={className}
      onClick={onClick}
      variant={variant}
      size={size}
      borderRadius={borderRadius}
      color={branding.primaryColor}
      {...rest}
    >
      {isLoading ? (
        <Spinner topColor={colors.grey[300]} bottomColor={colors.grey[100]} />
      ) : (
        <Icon
          name={icon}
          size={iconSize || (large ? lg : medium ? md : sm)}
          color={
            disabled
              ? colors.grey[400]
              : rest.color || iconColor || configs.button[variant].styles.color
          }
        />
      )}
    </StyledIconButton>
  );
}

IconButton.displayName = 'iconButton';
