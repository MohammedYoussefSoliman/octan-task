import React from 'react';

import { ResponsiveSettings } from '@/theme/types';

export type FontSizeType = ResponsiveSettings | React.CSSProperties['fontSize'];

export type HoverType = {
  decoration?: React.CSSProperties['textDecoration'];
  color?: React.CSSProperties['color'];
  fontWeight?: React.CSSProperties['fontWeight'];
};

export type TypographyProps = {
  id?: string;
  text?: string | number;
  children?: React.ReactNode;
  fontSize?: FontSizeType;
  fontFamily?: React.CSSProperties['fontFamily'];
  weight?: number;
  color?: React.CSSProperties['color'];
  textDecoration?: React.CSSProperties['textDecoration'];
  textAlign?: React.CSSProperties['textAlign'];
  lineHeight?: React.CSSProperties['lineHeight'];
  isHeader?: boolean;
  direction?: React.CSSProperties['direction'];
  truncationWidth?: React.CSSProperties['width'];
  capitalizeFirstLetter?: boolean;
  uppercase?: boolean;
  startAdornment?: string;
  className?: string;
  endAdornment?: string;
  hover?: HoverType;
  noTrans?: boolean;
  as?: React.ElementType;
};

export type TypographicConfig =
  | 'fontSize'
  | 'weight'
  | 'lineHeight'
  | 'as'
  | 'isHeader';

export type StyledTextType = Omit<
  TypographyProps,
  'text' | 'as' | 'className' | 'noTrans'
> & {
  length?: number;
  lang?: 'en' | 'ar';
};
