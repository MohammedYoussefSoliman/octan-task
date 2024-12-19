import ThunkService from '../thunkService';

export const { postService: postShippingCompanies } = new ThunkService(
  'customer/shippingCompanies',
);
