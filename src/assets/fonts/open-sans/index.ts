import { FontFaceType } from '../types';

import BOLD_WOFF from './bold/OpenSans-Bold.woff';
import BOLD_WOFF2 from './bold/OpenSans-Bold.woff2';
import LIGHT_WOFF from './light/OpenSans-Light.woff';
import LIGHT_WOFF2 from './light/OpenSans-Light.woff2';
import REGULAR_WOFF from './regular/OpenSans-Regular.woff';
import REGULAR_WOFF2 from './regular/OpenSans-Regular.woff2';
import SEMIBOLD_WOFF from './semi-bold/OpenSans-SemiBold.woff';
import SEMIBOLD_WOFF2 from './semi-bold/OpenSans-SemiBold.woff2';

const OpenSansFont: FontFaceType = {
  name: 'open-sans',
  weights: [
    {
      weightName: 'light',
      woff: LIGHT_WOFF,
      woff2: LIGHT_WOFF2,
      weight: 300,
    },
    {
      weightName: 'regular',
      woff: REGULAR_WOFF,
      woff2: REGULAR_WOFF2,
      weight: 400,
    },
    {
      weightName: 'semiBold',
      woff: SEMIBOLD_WOFF,
      woff2: SEMIBOLD_WOFF2,
      weight: 500,
    },
    {
      weightName: 'bold',
      woff: BOLD_WOFF,
      woff2: BOLD_WOFF2,
      weight: 600,
    },
  ],
};

export default OpenSansFont;
