import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function Linkedin({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_25_15)">
        <path
          d="M23.9942 24.0006V23.9996H24.0002V15.1976C24.0002 10.8916 23.0732 7.57457 18.0392 7.57457C15.6192 7.57457 13.9952 8.90257 13.3322 10.1616H13.2622V7.97657H8.48917V23.9996H13.4592V16.0656C13.4592 13.9766 13.8552 11.9566 16.4422 11.9566C18.9912 11.9566 19.0292 14.3406 19.0292 16.1996V24.0006H23.9942Z"
          fill={color || theme.pallet.primary[800]}
        />
        <path
          d="M0.396305 7.97727H5.37231V24.0003H0.396305V7.97727Z"
          fill={color || theme.pallet.primary[800]}
        />
        <path
          d="M2.882 0C1.291 0 0 1.291 0 2.882C0 4.473 1.291 5.791 2.882 5.791C4.473 5.791 5.764 4.473 5.764 2.882C5.763 1.291 4.472 0 2.882 0V0Z"
          fill={color || theme.pallet.primary[800]}
        />
      </g>
      <defs>
        <clipPath id="clip0_25_15">
          <rect width="24" height="24" fill={theme.colors.shades[100]} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Linkedin;
