import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function AddUser({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 14.3C5.6 14.3 2.2 15.6 2.2 18C2.2 19.8 4.7 20.8 9 20.8C12.3 20.8 15.8 19.9 15.8 18C15.8 15.7 12.2 14.3 9 14.3ZM9 19.3C5.3 19.3 3.8 18.4 3.8 18C3.8 16.8 6.2 15.8 9 15.8C11.9 15.8 14.2 17 14.2 18C14.2 18.3 12.3 19.3 9 19.3Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        d="M9 12.7C11.6 12.7 13.8 10.6 13.8 7.9C13.8 5.2 11.6 3.2 9 3.2C6.4 3.2 4.2 5.4 4.2 8C4.2 10.6 6.4 12.7 9 12.7ZM9 4.7C10.8 4.7 12.2 6.2 12.2 7.9C12.2 9.6 10.7 11.1 9 11.1C7.3 11.1 5.8 9.8 5.8 8C5.8 6.2 7.2 4.7 9 4.7Z"
        fill={color || theme.pallet.primary[500]}
      />
      <path
        d="M21 11.2H18.8V9C18.8 8.6 18.5 8.2 18 8.2C17.5 8.2 17.2 8.6 17.2 9V11.2H15C14.6 11.2 14.2 11.5 14.2 12C14.2 12.5 14.5 12.8 15 12.8H17.2V15C17.2 15.4 17.5 15.8 18 15.8C18.5 15.8 18.8 15.5 18.8 15V12.7H21C21.4 12.7 21.8 12.4 21.8 11.9C21.8 11.4 21.4 11.2 21 11.2Z"
        fill={color || theme.pallet.primary[500]}
      />
    </svg>
  );
}

export default AddUser;
