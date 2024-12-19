import ThunkService from '../thunkService';

export const { getService: fetchRefundReasons } = new ThunkService(
  'returnReasons',
);
