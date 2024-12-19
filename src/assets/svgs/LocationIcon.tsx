import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function LocationIcon({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6191 8.45C19.5691 3.83 15.5391 1.75 11.9991 1.75C11.9991 1.75 11.9991 1.75 11.9891 1.75C8.45912 1.75 4.41912 3.82 3.36912 8.44C2.19912 13.6 5.35912 17.97 8.21912 20.72C9.27912 21.74 10.6391 22.25 11.9991 22.25C13.3591 22.25 14.7191 21.74 15.7691 20.72C18.6291 17.97 21.7891 13.61 20.6191 8.45ZM11.9991 13.46C10.2591 13.46 8.84912 12.05 8.84912 10.31C8.84912 8.57 10.2591 7.16 11.9991 7.16C13.7391 7.16 15.1491 8.57 15.1491 10.31C15.1491 12.05 13.7391 13.46 11.9991 13.46Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default LocationIcon;