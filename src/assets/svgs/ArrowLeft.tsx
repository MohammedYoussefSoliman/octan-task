import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function ArrowLeft({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '20'}
      height={size || '20'}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.50562 15.5889C8.21273 15.8818 7.73785 15.8818 7.44496 15.5889L2.38666 10.5306C2.09377 10.2377 2.09377 9.76286 2.38666 9.46996L7.44496 4.41156C7.73785 4.11867 8.21272 4.11866 8.50562 4.41155C8.79851 4.70444 8.79852 5.17932 8.50563 5.47221L3.97765 10.0003L8.50562 14.5283C8.79852 14.8212 8.79852 15.296 8.50562 15.5889Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8337 10.0005C17.8337 10.4147 17.4979 10.7505 17.0837 10.7505L3.0587 10.7505C2.64448 10.7505 2.3087 10.4147 2.3087 10.0005C2.3087 9.58627 2.64448 9.25049 3.0587 9.25049L17.0837 9.25048C17.4979 9.25048 17.8337 9.58627 17.8337 10.0005Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default ArrowLeft;
