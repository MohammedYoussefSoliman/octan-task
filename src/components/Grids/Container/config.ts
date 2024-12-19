import { ContainerConfig } from './types';

const containerWidths: ContainerConfig = {
  fullWidth: {
    xs: '100%',
  },
  extraWide: {
    xs: '95%',
    md: '100%',
    xxl: '1400px',
    hd: '1650px',
  },
  wide: {
    xs: '100%',
    xl: '1250px',
    xxl: '1350px',
    hd: '1540px',
  },
  medium: {
    xs: '100%',
    sm: '460px',
    md: '640px%',
    lg: '870px',
    xl: '1000px',
    xxl: '1300px',
    hd: '1340px',
  },
  normal: {
    xs: '100%',
    sm: '420px',
    md: '600px%',
    lg: '820px',
    xl: '1100px',
    hd: '1225px',
  },
};

export default containerWidths;
