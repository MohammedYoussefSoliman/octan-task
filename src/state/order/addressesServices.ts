import ThunkService from '../thunkService';

export const { getService: getAddresses, postService: postAddress } =
  new ThunkService('customer/addresses');
