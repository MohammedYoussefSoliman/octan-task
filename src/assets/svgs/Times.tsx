import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function Times({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '20'}
      height={size || '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2803 3.21967C16.5732 3.51256 16.5732 3.98744 16.2803 4.28033L4.28033 16.2803C3.98744 16.5732 3.51256 16.5732 3.21967 16.2803C2.92678 15.9874 2.92678 15.5126 3.21967 15.2197L15.2197 3.21967C15.5126 2.92678 15.9874 2.92678 16.2803 3.21967Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.21967 3.21967C3.51256 2.92678 3.98744 2.92678 4.28033 3.21967L16.2803 15.2197C16.5732 15.5126 16.5732 15.9874 16.2803 16.2803C15.9874 16.5732 15.5126 16.5732 15.2197 16.2803L3.21967 4.28033C2.92678 3.98744 2.92678 3.51256 3.21967 3.21967Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default Times;
