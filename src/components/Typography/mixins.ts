import { CSSProperties } from 'react';

import { css } from '@emotion/react';

import devices from '@/theme/sizes';

import { FontSizeType, HoverType } from './types';

export const configureTruncation = (
  truncationWidth: CSSProperties['width'],
) => css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: ${truncationWidth};
`;

export const configureAdornment = (
  content: string,
  direction: 'before' | 'after',
  localCode: 'en' | 'ar',
) => {
  if (direction === 'before') {
    return css`
      &::before {
        content: '${content}';
        position: relative;
        right: ${localCode === 'ar' ? '-0.5ch' : '0.5ch'};
      }
    `;
  }
  return css`
    &::after {
      content: '${content}';
      position: relative;
      left: ${localCode === 'ar' ? '-0.5ch' : '0.5ch'};
    }
  `;
};

export const manageFontSize = (
  fontSize: FontSizeType,
  length: number,
): FontSizeType => {
  let fontSizeRatio = 1;
  // this handles the font size of headers in case the text length increased
  if (length > 30 && length < 45) fontSizeRatio = 0.85;
  if (length >= 45) fontSizeRatio = 0.7;

  if (fontSize instanceof Object) {
    const fontSizeKeys = Object.keys(fontSize);
    const fontSizeValues = Object.values(fontSize);
    let managedFontSize = {};
    fontSizeKeys.forEach((key, index) => {
      managedFontSize = {
        ...managedFontSize,
        [key]: `calc(${fontSizeValues[index]} * ${fontSizeRatio})`,
      };
    });
    return managedFontSize as FontSizeType;
  }
  return `calc(${fontSize} * ${fontSizeRatio})`;
};

export const configureFontSize = (fontSize: FontSizeType) => {
  if (fontSize instanceof Object) {
    const keys = Object.keys(fontSize) as Array<keyof typeof fontSize>;
    let stylesObject = {
      fontSize: fontSize.xs,
    };
    (keys as string[]).forEach((key) => {
      stylesObject = {
        ...stylesObject,
        [devices[key as keyof typeof devices]]: {
          fontSize: fontSize[key as keyof typeof devices],
        },
      };
    });
    return css(stylesObject);
  }
  return css`
    font-size: ${fontSize};
  `;
};

export const configureHover = (hoverStyles: HoverType) => css`
  &:hover {
    text-decoration: ${hoverStyles.decoration};
    color: ${hoverStyles.color};
    font-weight: ${hoverStyles.fontWeight};
  }
`;
