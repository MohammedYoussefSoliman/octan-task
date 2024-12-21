import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function CheckIcon({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5233 6.46272C19.82 6.75173 19.8263 7.22656 19.5373 7.52329L9.79763 17.5233C9.65461 17.6701 9.45772 17.752 9.25274 17.75C9.04777 17.7479 8.85258 17.662 8.71257 17.5123L4.45222 12.9567C4.16929 12.6541 4.18519 12.1795 4.48772 11.8966C4.79025 11.6137 5.26486 11.6296 5.54779 11.9321L9.27137 15.9138L18.4627 6.47671C18.7517 6.17998 19.2266 6.17372 19.5233 6.46272Z"
        fill={color || theme?.colors?.shades[100]}
      />
    </svg>
  );
}

export default CheckIcon;
