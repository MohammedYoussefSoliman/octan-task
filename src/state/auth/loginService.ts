import ThunkService from '../thunkService';

const { postService: registerService } = new ThunkService('customer/login');

export default registerService;
