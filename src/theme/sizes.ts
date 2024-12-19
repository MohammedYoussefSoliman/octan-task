export const breakpoints = {
  xs: "300px",
  sm: "400px",
  md: "768px",
  lg: "992px",
  xl: "1281px",
  xxl: "1360px",
  hd: "1900px",
};

export const container = {
  xSmall: `@container (min-width: ${breakpoints.xs})`,
  small: `@container (min-width: ${breakpoints.sm})`,
  medium: `@container (min-width: ${breakpoints.md})`,
  large: `@container (min-width: ${breakpoints.lg})`,
  xLarge: `@container (min-width: ${breakpoints.xl})`,
  xxLarge: `@container (min-width: ${breakpoints.xxl})`,
  hd: `@container (min-width: ${breakpoints.hd})`,
};

const devices = {
  xs: `@media screen and (min-width: ${breakpoints.xs})`,
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
  xxl: `@media screen and (min-width: ${breakpoints.xxl})`,
  hd: `@media screen and (min-width: ${breakpoints.hd})`,
};

export default devices;
