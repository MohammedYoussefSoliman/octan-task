import { FontStyleConfig } from '@/theme/types';

const typographyConfig: FontStyleConfig = {
  h1: {
    fontSize: {
      xs: '32px',
      sm: '36px',
      md: '42px',
      lg: '48px',
      xl: '56px',
      xxl: '64px',
    },
    weight: 600,
    lineHeight: 1.5,
    isHeader: true,
    as: 'h1',
  },
  h2: {
    fontSize: {
      xs: '28px',
      sm: '32px',
      md: '36px',
      lg: '42px',
      xl: '48px',
      xxl: '52px',
    },
    weight: 600,
    lineHeight: 1.5,
    isHeader: true,
    as: 'h2',
  },
  h3: {
    fontSize: {
      xs: '24px',
      md: '28px',
      lg: '32px',
      xl: '36px',
      xxl: '40px',
    },
    weight: 600,
    isHeader: true,
    lineHeight: 1.5,
    as: 'h3',
  },
  h4: {
    fontSize: {
      xs: '22px',
      md: '24px',
      lg: '28px',
      xl: '32px',
      xxl: '36px',
    },
    weight: 600,
    isHeader: true,
    lineHeight: 1.5,
    as: 'h4',
  },
  h5: {
    fontSize: {
      xs: '20px',
      md: '22px',
      lg: '24px',
      xl: '28px',
      xxl: '32px',
    },
    lineHeight: 1.5,
    isHeader: true,
    weight: 600,
    as: 'h5',
  },
  h6: {
    fontSize: {
      xs: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
    },
    weight: 600,
    isHeader: true,
    lineHeight: 1.5,
    as: 'h6',
  },
  p1: {
    fontSize: {
      xs: '15px',
      md: '16px',
      xl: '18px',
      xxl: '20px',
    },
    weight: 400,
    lineHeight: 1.5,
    isHeader: false,
    as: 'p',
  },
  p2: {
    fontSize: {
      xs: '14px',
      md: '16px',
      xl: '18px',
    },
    weight: 400,
    lineHeight: 1.5,
    isHeader: false,
    as: 'p',
  },
  p3: {
    fontSize: {
      xs: '13px',
      md: '15px',
      lg: '16px',
    },
    weight: 400,
    isHeader: false,
    lineHeight: 1.5,
    as: 'p',
  },
  small: {
    fontSize: {
      xs: '10px',
      md: '12px',
      lg: '14px',
    },
    weight: 300,
    isHeader: false,
    lineHeight: 1.2,
    as: 'small',
  },
};

export default typographyConfig;
