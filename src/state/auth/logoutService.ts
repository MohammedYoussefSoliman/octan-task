import ThunkService from '../thunkService';

const { postService: logoutService } = new ThunkService('customer/logout');

export default logoutService;
