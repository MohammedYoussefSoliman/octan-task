import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function WarningIcon({ size, color }: SVGprop) {
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
        d="M12 14V10"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1127 18.4929C21.5049 19.1595 21.0242 19.9999 20.2508 19.9999H3.74761C2.97419 19.9999 2.49354 19.1595 2.88567 18.4929L11.1373 4.46515C11.5239 3.80784 12.4745 3.80784 12.8611 4.46515L21.1127 18.4929Z"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.5C12.2761 17.5 12.5 17.2761 12.5 17C12.5 16.7239 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.7239 11.5 17C11.5 17.2761 11.7239 17.5 12 17.5Z"
        fill={color || theme.pallet.primary[500]}
        stroke={color || theme.pallet.primary[500]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default WarningIcon;
