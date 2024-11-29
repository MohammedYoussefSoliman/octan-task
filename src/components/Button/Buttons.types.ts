import React from 'react';

import { icons } from 'lucide-react';

export type Variant =
  | 'primary'
  | 'success'
  | 'warn'
  | 'destructive'
  | 'light'
  | 'neutral';
export type Size = 'sm' | 'md' | 'lg';
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  fill?: 'outlined' | 'filled';
  size?: Size;
  width?: 'full' | 'min' | 'max' | 'fit' | 'initial';
  iconFill?: 'outlined' | 'filled';
  suffixIcon?: keyof typeof icons;
  prefixIcon?: keyof typeof icons;
  isLoading?: React.ReactNode;
  isFocused?: boolean;
}
