import React from 'react';

import { IconType } from '@/components/Icon';

export type IconPropsType = {
  size?: number;
  color?: React.CSSProperties['color'];
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'transparent'
  | 'light'
  | 'text';

export type ButtonPropsType = {
  children: React.ReactNode;
  onClick?: (event?: React.ChangeEvent<any>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: ButtonVariant;
  fullWidth?: boolean;
  width?: React.CSSProperties['width'];
  whitBg?: boolean;
  color?: React.CSSProperties['color'];
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  id?: string;
  as?: React.ElementType;
  borderRadius?: 'sm' | 'md' | 'lg' | 'full';
};

export type IconButtonType = Omit<ButtonPropsType, 'children'> & {
  icon: IconType;
  iconSize?: number;
  iconColor?: React.CSSProperties['color'];
};

export type StyledButtonType = Omit<
  ButtonPropsType,
  'children' | 'onClick' | 'className' | 'isLoading' | 'id'
>;

export type NavigationButtonType = {
  children?: React.ReactNode;
  onClick?: (event?: React.ChangeEvent<any>) => void;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  direction?: 'left' | 'right';
  iconSize?: number;
  iconColor?: React.CSSProperties['color'];
};

export type StyledNavButton = {
  active?: boolean;
  disabled?: boolean;
};
