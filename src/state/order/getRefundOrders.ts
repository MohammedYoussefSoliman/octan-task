import ThunkService from '../thunkService';

export const { getService: getOrders } = new ThunkService('customer/orders');
