import React from 'react';

import { StyleValue } from '@/components/Grids/Flex/types';
import { IconType } from '@/components/Icon';

export type CardProps = {
  heading?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  width?: StyleValue<React.CSSProperties['width']>;
  headerAction?: React.ReactNode;
  className?: string;
};

export type MediaCardProps = {
  icon: IconType;
  heading: string;
  text?: string;
  width?: StyleValue<React.CSSProperties['width']>;
  onClick?: () => void;
  className?: string;
};

export type NotificationCardProps = {
  icon: IconType;
  heading: string;
  width?: StyleValue<React.CSSProperties['width']>;
  status: 'failure' | 'success' | 'warning' | 'info';
  onClick: () => void;
  buttonLabel?: string;
  className?: string;
};
