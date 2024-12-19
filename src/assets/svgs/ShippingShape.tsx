import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function ShippingIcon({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "40"}
      height={size || "40"}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.125 33.3335C12.8864 33.3335 15.125 31.095 15.125 28.3335C15.125 25.572 12.8864 23.3335 10.125 23.3335C7.36358 23.3335 5.125 25.572 5.125 28.3335C5.125 31.095 7.36358 33.3335 10.125 33.3335Z"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.4583 33.3335C31.2198 33.3335 33.4583 31.095 33.4583 28.3335C33.4583 25.572 31.2198 23.3335 28.4583 23.3335C25.6968 23.3335 23.4583 25.572 23.4583 28.3335C23.4583 31.095 25.6968 33.3335 28.4583 33.3335Z"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.125 30H23.4583"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.4583 29.9998H34.2916C35.9583 29.9998 36.7916 29.1665 36.7916 26.111V19.9998C36.7916 16.6665 35.9583 15.4165 34.2916 12.4998C32.1864 8.81572 31.7916 6.6665 25.9583 6.6665C20.9583 6.6665 10.1249 6.6665 10.1249 6.6665C5.12492 6.6665 3.45825 9.1665 3.45825 14.4443V26.111"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.45825 11.6665H11.7916"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.125 6.6665C25.125 6.6665 25.4307 12.9486 27.8702 15.6409C30.3095 18.3332 36.7917 18.3332 36.7917 18.3332"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.12492 29.9998C4.12492 29.9998 3.45825 29.3332 3.45825 28.3332V26.6665"
        stroke={color || theme.pallet.primary[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ShippingIcon;
