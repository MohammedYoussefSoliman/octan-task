import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function Info({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_102_9)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8442 6.23376C12.1884 6.23376 12.4675 6.51286 12.4675 6.85714V11.8961C12.4675 12.2404 12.1884 12.5195 11.8442 12.5195C11.4999 12.5195 11.2208 12.2404 11.2208 11.8961V6.85714C11.2208 6.51286 11.4999 6.23376 11.8442 6.23376Z"
          fill={color || theme.colors.shades[100]}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.225181 12C0.225181 5.40169 5.5077 0.0389557 12.0409 0.0389557C18.5741 0.0389557 23.8565 5.40169 23.8565 12C23.8565 18.5983 18.5741 23.961 12.0409 23.961C5.5077 23.961 0.225181 18.5983 0.225181 12ZM12.0409 1.28571C6.21138 1.28571 1.47193 6.07504 1.47193 12C1.47193 17.925 6.21138 22.7143 12.0409 22.7143C17.8704 22.7143 22.6098 17.925 22.6098 12C22.6098 6.07504 17.8704 1.28571 12.0409 1.28571Z"
          fill={color || theme.colors.shades[100]}
        />
        <path
          d="M11.8442 17.7662C12.3605 17.7662 12.7792 17.3475 12.7792 16.8311C12.7792 16.3148 12.3605 15.8961 11.8442 15.8961C11.3278 15.8961 10.9091 16.3148 10.9091 16.8311C10.9091 17.3475 11.3278 17.7662 11.8442 17.7662Z"
          fill={color || theme.colors.shades[100]}
        />
      </g>
      <defs>
        <clipPath id="clip0_102_9">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Info;
