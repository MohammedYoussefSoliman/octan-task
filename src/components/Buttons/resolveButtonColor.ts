import { CSSProperties } from 'react';

import tinyColor2 from 'tinycolor2';

import { ButtonVariant } from './types';

const resolveColorMode = (tinyColor: tinyColor2.Instance) => {
  const isLightColor = tinyColor.isLight();
  return isLightColor
    ? tinyColor.darken(5).toString()
    : tinyColor.lighten(5).toString();
};
const resolveColorGreyMode = (tinyColor: tinyColor2.Instance) => {
  const isLightColor = tinyColor.isLight();
  return isLightColor
    ? tinyColor.greyscale().toString()
    : tinyColor.setAlpha(0.38).toString();
};
const resolveColorLightMode = (tinyColor: tinyColor2.Instance) => {
  const isLightColor = tinyColor.isLight();
  return isLightColor
    ? tinyColor.lighten(20).toString()
    : tinyColor.lighten(40).toString();
};

const resolveColor = (
  color: CSSProperties['color'],
  variant: ButtonVariant = 'primary',
) => {
  const coloredButton: { [key in ButtonVariant]: any } = {
    primary: {
      styles: {
        background: color,
      },
      hoverStyles: {
        background: resolveColorMode(tinyColor2(color)),
      },
      disabled: {
        background: resolveColorGreyMode(tinyColor2(color)),
      },
    },
    secondary: {
      styles: {
        background: 'transparent',
        color,
        border: `1px solid ${color}`,
      },
      hoverStyles: {
        borderColor: color,
        backgroundColor: tinyColor2(color).setAlpha(0.1).toString(),
      },
    },
    transparent: {
      styles: {
        background: 'transparent',
        color,
      },
      hoverStyles: {
        background: tinyColor2(color).setAlpha(0.1).toString(),
      },
    },
    light: {
      styles: {
        background: resolveColorLightMode(tinyColor2(color)),
      },
    },
    text: {
      styles: {
        color,
      },
    },
  };

  return coloredButton[variant];
};

export default resolveColor;
