import React from 'react';

export type LinkTypeProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  color?: React.CSSProperties['color'];
  callback?: () => void;
  relative?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
};
export type ButtonTypeProps = {
  children: React.ReactNode;
  className?: string;
  color?: React.CSSProperties['color'];
  onClick: () => void;
  disabled?: boolean;
};

export type GoBackProps = {
  callback?: () => void;
};

export type NavLinkTypeProps = {
  to: string;
  children: string;
  className?: string;
  relative?: boolean;
  hash?: string;
  variant?: 'normal' | 'transparent';
  mode?: 'menu' | 'bar';
  callback?: () => void;
};

export type DirectLinkTypeProps = {
  className?: string;
};
