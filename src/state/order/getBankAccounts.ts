import ThunkService from '../thunkService';

export const { getService: getBankAccounts } = new ThunkService(
  'customer/bankAccounts',
);
