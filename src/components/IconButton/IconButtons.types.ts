import React from 'react';

import { IconName } from '@/components/Icon/Icon.types';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  variant?: 'primary' | 'success' | 'warn' | 'destructive' | 'light' | 'ghost';
  fill?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  iconFill?: 'outlined' | 'filled';
  isLoading?: boolean;
  className?: string;
  iconClassName?: string;
  iconColor?: string;
}
