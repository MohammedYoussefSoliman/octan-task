/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

type Args = {
  formData: FormData;
  successCallback?: (data: any) => void;
  setLoading?: (value: boolean) => void;
  onFailure?: (value: string) => void;
  successMessage?: string;
};

const ordersService = createAsyncThunk(
  'orders/fetchOrders',
  async (args: Args, { rejectWithValue }) => {
    const { formData, successCallback, setLoading, successMessage, onFailure } =
      args;
    try {
      if (setLoading) setLoading(true);
      const response = await axios.post('orders', formData);
      if (successCallback) successCallback(response.data);
      if (successMessage) toast.success(successMessage);
      return response.data.records;
    } catch (err) {
      const error = err as AxiosError<{
        errors: { message: string }[];
      }>;
      const message = error?.response?.data?.errors[0]?.message;
      if (message) {
        toast.error(message);
        if (onFailure) onFailure(message);
      }
      return rejectWithValue([]);
    } finally {
      if (setLoading) setLoading(false);
    }
  },
);

export default ordersService;
