import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function ArrowRight({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "20"}
      height={size || "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4951 4.41156C11.788 4.11866 12.2628 4.11866 12.5557 4.41156L17.614 9.46987C17.9069 9.76276 17.9069 10.2376 17.614 10.5305L12.5557 15.5889C12.2629 15.8818 11.788 15.8818 11.4951 15.5889C11.2022 15.296 11.2022 14.8212 11.4951 14.5283L16.0231 10.0002L11.4951 5.47222C11.2022 5.17932 11.2022 4.70445 11.4951 4.41156Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.16699 10C2.16699 9.58579 2.50278 9.25 2.91699 9.25H16.942C17.3562 9.25 17.692 9.58579 17.692 10C17.692 10.4142 17.3562 10.75 16.942 10.75H2.91699C2.50278 10.75 2.16699 10.4142 2.16699 10Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default ArrowRight;
