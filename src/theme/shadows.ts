import tinyColor from 'tinycolor2';

import { blue, purple } from './colors';

const shadows = {
  1: `0px 2px 4px ${tinyColor(blue[1000]).setAlpha(0.24).toString()}`,
  2: `0px 4px 8px ${tinyColor(blue[1000]).setAlpha(0.2).toString()}`,
  3: `0px 8px 16px ${tinyColor(blue[1000]).setAlpha(0.16).toString()}`,
  4: `0px 16px 32px ${tinyColor(blue[1000]).setAlpha(0.12).toString()}`,
  5: `0px 24px 48px ${tinyColor(blue[1000]).setAlpha(0.08).toString()}`,
  6: `0px 24px 48px ${tinyColor(purple[400]).setAlpha(0.08).toString()}`,
};

export default shadows;
