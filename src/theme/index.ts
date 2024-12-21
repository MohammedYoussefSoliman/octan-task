import IBMPlexSans from '@/assets/fonts/IBMPlex-sans-arabic';
import OpenSans from '@/assets/fonts/open-sans';

import pallets, {
  blue,
  dark,
  error,
  green,
  grey,
  orange,
  purple,
  red,
  shades,
  yellow,
} from './colors';
import gradients from './gradients';
import shadows from './shadows';
import { ThemeType } from './types';

const getTheme = (mode: 'dark' | 'light'): ThemeType => {
  return {
    font: IBMPlexSans.name,
    pallet: pallets[mode],
    colors: {
      purple,
      blue,
      red,
      orange,
      yellow,
      green,
      grey,
      error,
      shades,
      dark,
    },
    shadows,
    gradients,
    fonts: {
      arabic: IBMPlexSans.name,
      english: OpenSans.name,
    },
    branding: {
      isEnabled: false,
      primaryColor: undefined,
      secondaryColor: undefined,
      backgroundColor: undefined,
      backgroundImage: undefined,
      logo: {
        url: undefined,
        image: undefined,
      },
    },
  };
};

export default getTheme;
