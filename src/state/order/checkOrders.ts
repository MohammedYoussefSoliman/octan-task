/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import generateInstance from '@/services/thunkInstance';

import { RootState } from '@/state';
import { showError, showSuccess } from '@/state/ui-actions/slice';

type Args = {
  formData: FormData;
  successCallback?: (data: any) => void;
  setLoading?: (value: boolean) => void;
  onFailure?: (value: string) => void;
  successMessage?: string;
};

export const checkOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (args: Args, { dispatch, getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const axiosInstance = generateInstance(state, dispatch);
    const { formData, successCallback, setLoading, successMessage, onFailure } =
      args;
    try {
      if (setLoading) setLoading(true);
      const response = await axiosInstance.post(
        'customer/checkOrder',
        formData,
      );
      if (successCallback) successCallback(response.data);
      if (successMessage) dispatch(showSuccess(successMessage));
      return response.data.records;
    } catch (err) {
      const error = err as any;
      const message = error?.response?.data?.errors[0]?.message;
      dispatch(showError(message));
      if (onFailure) onFailure(message);
      return rejectWithValue([]);
    } finally {
      if (setLoading) setLoading(false);
    }
  },
);
