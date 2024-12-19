import { SVGprop } from "./types";

function MailShape({ size }: SVGprop) {
  return (
    <svg
      width={size || "40"}
      height={size || "40"}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_9_55)">
        <path
          d="M19.875 8C30.6667 8 33.75 9.37037 33.75 20.3333C33.75 31.2963 30.6667 32.6667 19.875 32.6667C9.08333 32.6667 6 31.125 6 20.3333C6 9.54167 9.08333 8 19.875 8Z"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_9_55)">
        <path
          d="M10.625 17.25C15.25 21.875 17.5625 23.4167 19.875 23.4167C22.1875 23.4167 24.5 21.875 29.125 17.25"
          stroke="#FFCD2E"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_9_55"
          x="0.700012"
          y="4.7"
          width="38.35"
          height="35.2667"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9_55"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9_55"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_9_55"
          x="5.32501"
          y="13.95"
          width="29.1"
          height="16.7667"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9_55"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9_55"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default MailShape;
