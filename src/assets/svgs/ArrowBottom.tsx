import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function ArrowBottom({ size, color }: SVGprop) {
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
        d="M15.589 11.495C15.8819 11.7879 15.8819 12.2627 15.589 12.5556L10.5307 17.6139C10.2378 17.9068 9.76296 17.9068 9.47006 17.6139L4.41166 12.5556C4.11877 12.2627 4.11876 11.7879 4.41165 11.495C4.70454 11.2021 5.17941 11.2021 5.47231 11.495L10.0004 16.0229L14.5284 11.495C14.8213 11.2021 15.2961 11.2021 15.589 11.495Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0006 2.16689C10.4148 2.16689 10.7506 2.50267 10.7506 2.91689L10.7506 16.9419C10.7506 17.3561 10.4148 17.6919 10.0006 17.6919C9.58637 17.6919 9.25058 17.3561 9.25058 16.9419L9.25058 2.91689C9.25058 2.50267 9.58637 2.16689 10.0006 2.16689Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default ArrowBottom;
