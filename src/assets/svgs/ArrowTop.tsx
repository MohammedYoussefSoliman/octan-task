import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function ArrowTop({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "20"}
      height={size || "20"}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41166 8.50552C4.11876 8.21262 4.11876 7.73775 4.41166 7.44486L9.46997 2.38655C9.76286 2.09366 10.2377 2.09366 10.5306 2.38655L15.589 7.44485C15.8819 7.73774 15.8819 8.21261 15.589 8.50551C15.2961 8.79841 14.8213 8.79841 14.5284 8.50552L10.0003 3.97754L5.47232 8.50552C5.17942 8.79841 4.70455 8.79841 4.41166 8.50552Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0001 17.8336C9.58589 17.8336 9.2501 17.4978 9.2501 17.0836L9.2501 3.05859C9.2501 2.64438 9.58589 2.30859 10.0001 2.30859C10.4143 2.30859 10.7501 2.64438 10.7501 3.05859L10.7501 17.0836C10.7501 17.4978 10.4143 17.8336 10.0001 17.8336Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default ArrowTop;
