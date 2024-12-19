import ThunkService from '../thunkService';

export const { getService: getBranding } = new ThunkService(
  'store-landing-page',
);

export default getBranding;
