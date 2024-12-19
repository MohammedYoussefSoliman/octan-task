import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function ChevronRight({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "16"}
      height={size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.21967 2.21967C5.51256 1.92678 5.98744 1.92678 6.28033 2.21967L11.2803 7.21967C11.5732 7.51256 11.5732 7.98744 11.2803 8.28033L6.28033 13.2803C5.98744 13.5732 5.51256 13.5732 5.21967 13.2803C4.92678 12.9874 4.92678 12.5126 5.21967 12.2197L9.68934 7.75L5.21967 3.28033C4.92678 2.98744 4.92678 2.51256 5.21967 2.21967Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default ChevronRight;
