import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function InfoShape({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="24"
        height="24"
        rx="12"
        fill={color || theme.colors.yellow[500]}
      />
      <path
        d="M12 12V8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16C12.2761 16 12.5 15.7761 12.5 15.5C12.5 15.2239 12.2761 15 12 15C11.7239 15 11.5 15.2239 11.5 15.5C11.5 15.7761 11.7239 16 12 16Z"
        fill="white"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default InfoShape;
