import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Flex, Spinner } from '@/components';

import { StyledButton } from '../styles';
import { ButtonPropsType } from '../types';

export function Button({
  children,
  onClick,
  className,
  isLoading,
  disabled,
  variant = 'primary',
  size = 'lg',
  borderRadius = 'full',
  as,
  ...rest
}: ButtonPropsType) {
  const { colors } = useTheme();

  const { t } = useTranslation('app');

  return (
    <StyledButton
      disabled={isLoading || disabled}
      className={className}
      onClick={onClick}
      variant={variant}
      size={size}
      as={as}
      borderRadius={borderRadius}
      {...rest}
    >
      {isLoading ? (
        <Flex gap={{ xs: 8, md: 18 }} align="center">
          <Spinner topColor={colors.grey[300]} bottomColor={colors.grey[100]} />
          {typeof children === 'string' ? t(children) : children}
        </Flex>
      ) : typeof children === 'string' ? (
        t(children)
      ) : (
        children
      )}
    </StyledButton>
  );
}
