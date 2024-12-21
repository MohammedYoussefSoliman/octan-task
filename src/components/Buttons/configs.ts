import tinyColor from 'tinycolor2';

import { RootState, store } from '@/state';
import getTheme from '@/theme';
import devices from '@/theme/sizes';

export function getCurrentState(): RootState {
  return store.getState();
}
store.subscribe(getCurrentState);

const { mode } = getCurrentState().ui;

const theme = getTheme(mode);
const { pallet, colors } = theme;

export const commonStyles = {
  fontSize: 14,
  fontWeight: 500,
};

const buttonConfigurations = {
  button: {
    primary: {
      styles: {
        background: pallet.primary[500],
        color: colors.shades[100],
        ...commonStyles,
      },
      hoverStyles: {
        background: pallet.primary[600],
      },
      disabled: {
        background: colors.grey[200],
        cursor: 'not-allowed',
      },
    },
    secondary: {
      styles: {
        background: 'transparent',
        color: pallet.primary[500],
        border: `1px solid ${pallet.primary[500]}`,
        ...commonStyles,
      },
      hoverStyles: {
        borderColor: pallet.primary[600],
        background: tinyColor(pallet.primary[600]).setAlpha(0.1).toString(),
      },
      disabled: {
        borderColor: colors.grey[200],
        color: colors.grey[200],
        cursor: 'not-allowed',
      },
    },
    transparent: {
      styles: {
        background: 'transparent',
        color: pallet.primary[500],
        ...commonStyles,
      },
      hoverStyles: {
        background: tinyColor(pallet.primary[600]).setAlpha(0.1).toString(),
      },
      disabled: {
        color: colors.grey[200],
        background: colors.shades[300],
        cursor: 'not-allowed',
      },
    },
    light: {
      styles: {
        background: pallet.primary[100],
        color: pallet.primary[600],
        ...commonStyles,
      },
      hoverStyles: {
        background: pallet.primary[50],
      },
      disabled: {
        color: colors.grey[200],
        background: colors.grey[100],
        cursor: 'not-allowed',
      },
    },
    text: {
      styles: {
        background: 'transparent',
        color: pallet.text.heading,
        ...commonStyles,
      },
      hoverStyles: {
        color: pallet.primary[500],
      },
      disabled: {
        color: colors.grey[200],
        cursor: 'not-allowed',
      },
    },
  },
};

export const sizes = {
  button: {
    sm: {
      styles: {
        // minWidth: "100px",
        height: '26px',
        fontSize: 10,
        [devices.lg]: {
          fontSize: 12,
          height: '32px',
        },
        [devices.xl]: {
          fontSize: 14,
        },
      },
    },
    md: {
      styles: {
        // minWidth: "125px",
        height: '40px',
        fontSize: 12,
        [devices.lg]: {
          fontSize: 14,
          height: '50px',
        },
        [devices.xl]: {
          fontSize: 16,
        },
      },
    },
    lg: {
      styles: {
        // minWidth: "150px",
        height: '50px',
        fontSize: 14,
        [devices.lg]: {
          fontSize: 16,
          height: '60px',
        },
        [devices.xl]: {
          fontSize: 20,
        },
      },
    },
  },
  iconButton: {
    sm: {
      styles: {
        height: '26px',
        width: '26px',
        [devices.md]: {
          height: '28px',
          width: '28px',
        },
        [devices.lg]: {
          height: '32px',
          width: '32px',
        },
      },
      iconSize: {
        sm: 10,
        md: 12,
        lg: 16,
      },
    },
    md: {
      styles: {
        height: '32px',
        width: '32px',
        fontSize: 12,
        [devices.lg]: {
          height: '40px',
          width: '40px',
        },
      },
      iconSize: {
        sm: 12,
        md: 14,
        lg: 16,
      },
    },
    lg: {
      styles: {
        height: '40px',
        width: '40px',
        [devices.lg]: {
          height: '44px',
          width: '44px',
        },
        [devices.xl]: {
          height: '46px',
          width: '46px',
        },
      },
      iconSize: {
        sm: 18,
        md: 20,
        lg: 22,
      },
    },
  },
};

export const borderRadiusConfigs = {
  sm: {
    'border-radius': '6px',
  },
  md: {
    'border-radius': '10px',
  },
  lg: {
    'border-radius': '12px',
  },
  full: {
    'border-radius': '100px',
  },
};

export default buttonConfigurations;
