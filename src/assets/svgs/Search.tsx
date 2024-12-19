import { useTheme } from "@emotion/react";
import { SVGprop } from "./types";

function Search({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 11C2.25 6.16751 6.16751 2.25 11 2.25C15.8325 2.25 19.75 6.16751 19.75 11C19.75 15.8325 15.8325 19.75 11 19.75C6.16751 19.75 2.25 15.8325 2.25 11ZM11 3.75C6.99593 3.75 3.75 6.99593 3.75 11C3.75 15.0041 6.99593 18.25 11 18.25C15.0041 18.25 18.25 15.0041 18.25 11C18.25 6.99593 15.0041 3.75 11 3.75Z"
        fill={color || theme.colors.shades[100]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4697 16.4697C16.7626 16.1768 17.2374 16.1768 17.5303 16.4697L21.5303 20.4697C21.8232 20.7626 21.8232 21.2374 21.5303 21.5303C21.2374 21.8232 20.7626 21.8232 20.4697 21.5303L16.4697 17.5303C16.1768 17.2374 16.1768 16.7626 16.4697 16.4697Z"
        fill={color || theme.colors.shades[100]}
      />
    </svg>
  );
}

export default Search;
