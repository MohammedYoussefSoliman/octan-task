import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function RemoveIcon({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 10C18 19 18 21 12 21C6 21 6 19 5 10"
        stroke={color || theme.colors.dark[200]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 7C3 7 6 6 12 6C18 6 21 7 21 7"
        stroke={color || theme.colors.dark[200]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6C9.375 4.5 9 3 12 3C15 3 14.625 4.5 15 6"
        stroke={color || theme.colors.dark[200]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RemoveIcon;
