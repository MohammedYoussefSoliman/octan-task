import { css } from '@emotion/react';

import devices from '@/theme/sizes';

import config from './config';
import { ConfigWidth } from './types';

const manageContainerConfig = (width: ConfigWidth) => {
  const containerConfig = config[width];
  const keys = Object.keys(containerConfig) as Array<
    keyof typeof containerConfig
  >;

  let stylesObject = {};

  keys.forEach((key) => {
    stylesObject = {
      ...stylesObject,
      [devices[key as keyof typeof devices]]: {
        maxWidth: containerConfig[key],
      },
    };
  });

  return css(stylesObject);
};

export default manageContainerConfig;
