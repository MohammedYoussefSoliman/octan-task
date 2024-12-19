import ThunkService from '../thunkService';

export const { postService: getPriceInfo } = new ThunkService(
  'customer/refund-price-details',
);
