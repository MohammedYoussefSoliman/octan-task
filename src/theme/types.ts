import React from 'react';

export type StoreBranding = {
  isEnabled: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  logo: {
    url?: string;
    image?: string;
  };
};

export type ResponsiveSettings<T = string> = {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
  hd?: T;
};

export type FontStyleConfig = {
  [key: string]: {
    fontSize: ResponsiveSettings;
    weight: number;
    lineHeight: string | number;
    isHeader: boolean;
    as?: React.ElementType;
  };
};

type ThemeObjectType = {
  [key: number | string]: string;
};

export type ColorsPalletType = {
  primary: ThemeObjectType;
  secondary: ThemeObjectType;
  text: ThemeObjectType;
};

export type ColorsType = {
  [key: string]: ThemeObjectType;
};

export interface ThemeType {
  colors: ColorsType;
  pallet: ColorsPalletType;
  font: string;
  shadows: ThemeObjectType;
  gradients: ThemeObjectType;
  fonts: ThemeObjectType;
  branding: StoreBranding;
}
