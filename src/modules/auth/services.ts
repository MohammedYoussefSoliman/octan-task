import { createAsyncThunk } from '@reduxjs/toolkit';

import { formDataHandler } from '@/helpers/functions';
import serviceInstance from '@/services/instance';
import generateInstance from '@/services/thunkInstance';
import { RootState, showError, showSuccess } from '@/state';

type Args = {
  formData: FormData;
  successCallback?: () => void;
  setLoading?: (value: boolean) => void;
  successMessage?: string;
};

type SendOTP = {
  phone_number: string;
  otp: number;
};

export const sendOTP = async (data: Omit<SendOTP, 'otp'>) => {
  const formData = formDataHandler(data);
  return serviceInstance.post('customer/sendOTP', formData);
};

export const verifyOTP = async (data: SendOTP) => {
  const formData = formDataHandler(data);
  return serviceInstance.post('customer/verifyOTP', formData);
};

export const register = async (data: any) => {
  const formData = formDataHandler(data);
  return serviceInstance.post('customer/register', formData);
};

export const login = createAsyncThunk(
  'customer/login',
  async (args: Args, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const axiosInstance = generateInstance(state, dispatch);
    const { formData, successCallback, setLoading, successMessage } = args;
    try {
      if (setLoading) setLoading(true);
      const response = await axiosInstance.post('customer/verifyOTP', formData);
      if (successCallback) successCallback();
      if (successMessage) dispatch(showSuccess(successMessage));
      return {
        token: response.data.accessToken,
        user: {
          role: ['consumer'],
          phone_number: response.data.phone_number,
          date_of_birth: response.data.date_of_birth,
          national_id: response.data.national_id,
          status: response.data.status,
          avatar: response.data.avatar,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        },
      };
    } catch (err) {
      const error = err as any;
      const message = error?.response?.data?.errors[0]?.message;
      dispatch(showError(message));
      return rejectWithValue([]);
    } finally {
      if (setLoading) setLoading(false);
    }
  },
);
