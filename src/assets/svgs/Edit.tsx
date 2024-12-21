import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function Edit({ size, color }: SVGprop) {
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
        d="M10.9989 18.5701C9.52138 20.0779 4.5207 20.213 4.16182 19.7954C3.80294 19.3778 3.96478 14.5057 5.43075 13.0017C6.89672 11.4977 10.1831 8.24127 13.0236 5.40836C17.0731 1.3586 22.6412 6.92703 18.5917 10.9768C15.7512 13.8097 12.4763 17.0623 10.9989 18.5701Z"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 6.5L17 11"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20H19"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Edit;
