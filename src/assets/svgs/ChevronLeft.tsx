import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function ChevronLeft({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '16'}
      height={size || '16'}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2803 2.21967C11.5732 2.51256 11.5732 2.98744 11.2803 3.28033L6.81066 7.75L11.2803 12.2197C11.5732 12.5126 11.5732 12.9874 11.2803 13.2803C10.9874 13.5732 10.5126 13.5732 10.2197 13.2803L5.21967 8.28033C4.92678 7.98744 4.92678 7.51256 5.21967 7.21967L10.2197 2.21967C10.5126 1.92678 10.9874 1.92678 11.2803 2.21967Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default ChevronLeft;
