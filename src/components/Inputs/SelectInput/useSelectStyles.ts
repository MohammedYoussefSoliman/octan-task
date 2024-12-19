import { useTheme } from '@emotion/react';

import devices from '@/theme/sizes';

type SelectStyles = {
  error?: boolean;
  rounded?: boolean;
  dense?: boolean;
  fullHeight?: boolean;
};

const useSelectStyles = ({
  error,
  rounded,
  dense,
  fullHeight,
}: SelectStyles) => {
  const { colors } = useTheme();

  return {
    control: (base: any) => ({
      ...base,
      border: `1px solid ${error ? colors.error[300] : colors.grey[300]}`,
      boxShadow: 'none',
      borderRadius: rounded ? '100px' : '10px',
      padding: '6px',
      height: fullHeight ? '100%' : '50px',
      width: '100%',
      '&:hover': {
        border: `1px solid  ${colors.grey[300]}`,
        background: colors.shades[200],
      },
      [devices.md]: {
        padding: dense ? '6px' : '8px 12px',
      },
      // [devices.lg]: {
      //   padding: dense ? "6px" : "8px 16px",
      // },
      // [devices.xl]: {
      //   padding: dense ? "8px" : "8px 30px",
      // },
    }),
    option: (base: any, state: any) => ({
      ...base,
      padding: dense ? '8px' : '14px',
      height: '100%',
      borderRadius: '10px',
      background: `${
        state.isFocused ? colors.shades[300] : colors.shades[100]
      }`,
      '&:hover': {
        background: colors.shades[300],
      },
      marginBottom: '8px',
      '&:last-of-type': {
        marginBottom: 0,
      },
    }),
    menu: (base: any) => ({
      ...base,
      border: `1px solid ${error ? colors.error[300] : colors.grey[400]}`,
      borderRadius: rounded ? '20px' : '10px',
      padding: dense ? '4px' : '8px',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      padding: 2,
      [devices.sm]: {
        padding: 6,
      },
      [devices.md]: {
        padding: 8,
      },
    }),
  };
};

export default useSelectStyles;
