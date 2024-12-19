import { CSSProperties } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import devices from '@/theme/sizes';

import { StyleValue } from './types';

// const responsiveStyleFactory = <T>(
//   value: ResponsiveCSSPropertyType<T>,
//   propertyName: keyof Properties,
// ) => {
//   let responsiveSettings = {};
//   const mediaQueries = Object.keys(value) as (keyof typeof devices)[];
//   mediaQueries.forEach((q) => {
//     if (value[q]) {
//       responsiveSettings = {
//         [propertyName]: value.xs,
//         ...responsiveSettings,
//         [devices[q]]: {
//           [propertyName]: `${value[q]}`,
//         },
//       };
//     }
//   });
//   return responsiveSettings;
// };

interface Style {
  styleFactory: <T>(
    value: StyleValue<T>,
    propertyName: keyof CSSProperties,
  ) => SerializedStyles;
}

const resolveCSSValue = (value: any | number) => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

export default class StyleFactory implements Style {
  constructor(propertyName: keyof CSSProperties) {
    this.styleFactory = function styling<
      T = CSSProperties[typeof propertyName],
    >(value: StyleValue<T>) {
      if (typeof value === 'number') {
        return css({
          [propertyName]: `${value}px`,
        });
      }
      if (typeof value === 'string') {
        return css({
          [propertyName]: value,
        });
      }

      let responsiveSettings = {};
      const mediaQueries = Object.keys(value) as (keyof typeof devices)[];
      mediaQueries.forEach((q) => {
        if (value[q]) {
          responsiveSettings = {
            [propertyName]: resolveCSSValue(value.xs),
            ...responsiveSettings,
            [devices[q]]: {
              [propertyName]: `${resolveCSSValue(value[q])}`,
            },
          };
        }
      });
      return css(responsiveSettings);
    };
  }

  styleFactory;
}
