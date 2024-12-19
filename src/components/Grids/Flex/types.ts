import React from 'react';

export type Spacing =
  | 'm'
  | 'mv'
  | 'mh'
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'ms'
  | 'me'
  | 'p'
  | 'pv'
  | 'ph'
  | 'pt'
  | 'pb'
  | 'pl'
  | 'pr'
  | 'ps'
  | 'pe';

export enum SpacingProperties {
  m = 'margin',
  mt = 'marginTop',
  mb = 'marginBottom',
  ml = 'marginLeft',
  mr = 'marginRight',
  mv = 'marginBlock',
  mh = 'marginInline',
  ms = 'marginInlineStart',
  me = 'marginInlineEnd',
  p = 'padding',
  pt = 'paddingTop',
  pb = 'paddingBottom',
  pl = 'paddingLeft',
  pr = 'paddingRight',
  pv = 'paddingBlock',
  ph = 'paddingInline',
  ps = 'paddingInlineStart',
  pe = 'paddingInlineEnd',
}

type CSSSpacingProperty =
  | React.CSSProperties['padding']
  | React.CSSProperties['margin'];
export type ResponsiveSpacingType = {
  xs: number | CSSSpacingProperty;
  sm?: number | CSSSpacingProperty;
  md?: number | CSSSpacingProperty;
  lg?: number | CSSSpacingProperty;
  xl?: number | CSSSpacingProperty;
  xxl?: number | CSSSpacingProperty;
  hd?: number | CSSSpacingProperty;
};

export type ResponsiveCSSPropertyType<T> = {
  xs: number | string | T;
  sm?: number | string | T;
  md?: number | string | T;
  lg?: number | string | T;
  xl?: number | string | T;
  xxl?: number | string | T;
  hd?: number | string | T;
};

export type StyleValue<T> = ResponsiveCSSPropertyType<T> | number | string;

export type ResponsiveDirectionType = {
  xs: number | React.CSSProperties['flexDirection'];
  sm?: number | React.CSSProperties['flexDirection'];
  md?: number | React.CSSProperties['flexDirection'];
  lg?: number | React.CSSProperties['flexDirection'];
  xl?: number | React.CSSProperties['flexDirection'];
  xxl?: number | React.CSSProperties['flexDirection'];
  hd?: number | React.CSSProperties['flexDirection'];
};

export type DirectionType =
  | number
  | React.CSSProperties['flexDirection']
  | ResponsiveDirectionType;

export type SpacingProperty =
  | number
  | CSSSpacingProperty
  | ResponsiveSpacingType;

export type SpacingType = {
  [key in Spacing]?: SpacingProperty;
};

export type FlexPropsType = {
  children: React.ReactNode;
  width?: StyleValue<React.CSSProperties['width']>;
  basis?: string;
  height?: StyleValue<React.CSSProperties['height']>;
  direction?: StyleValue<React.CSSProperties['flexDirection']>;
  justify?: StyleValue<React.CSSProperties['justifyContent']>;
  align?: StyleValue<React.CSSProperties['alignItems']>;
  gap?: StyleValue<React.CSSProperties['gap']>;
  flex?: StyleValue<React.CSSProperties['flex']>;
  fullWidth?: boolean;
  fullHeight?: boolean;
  withWrap?: boolean;
  maxWidth?: StyleValue<React.CSSProperties['maxWidth']>;
  minWidth?: React.CSSProperties['minWidth'];
  className?: string;
  as?: React.ElementType;
} & SpacingType;

export type StyledFlexWrapper = Omit<FlexPropsType, 'children' | 'as'>;
