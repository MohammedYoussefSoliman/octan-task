import ThunkService from '../thunkService';

const { postService: registerService } = new ThunkService('customer/register');

export default registerService;
