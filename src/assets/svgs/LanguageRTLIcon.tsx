import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function LanguageRTLIcon({ size, color }: SVGprop) {
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
        d="M2 18.7838V5H11.3801V7.66592H5.00163V10.4898H10.4717V13.136H5.00163V16.1179H11.3801V18.7838H2Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        d="M13.8371 18.7838V8.41633H16.7598V10.1739H16.8783C17.0626 9.6341 17.3851 9.16674 17.8459 8.77179C18.3067 8.37683 18.9452 8.17936 19.7614 8.17936C20.8278 8.17936 21.6308 8.53482 22.1706 9.24573C22.7235 9.95664 23 10.9703 23 12.2869V18.7838H20.0774V12.5238C20.0774 11.8524 19.972 11.3587 19.7614 11.0428C19.5508 10.7136 19.1756 10.5491 18.6358 10.5491C18.3988 10.5491 18.1684 10.582 17.9446 10.6478C17.7208 10.7005 17.5168 10.7926 17.3324 10.9243C17.1613 11.0559 17.0231 11.2205 16.9177 11.418C16.8124 11.6023 16.7598 11.8195 16.7598 12.0696V18.7838H13.8371Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default LanguageRTLIcon;
