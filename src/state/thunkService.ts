/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';

import generateInstance from '@/services/thunkInstance';
import { RootState, showError, showSuccess } from '@/state';

type ErrorFeedback = {
  message: string;
  errors: any[];
};

type Args = {
  formData: FormData;
  onSuccess?: (data: any) => void;
  onEnd?: () => void;
  onFailure?: (errorsFeedback: ErrorFeedback) => void;
  setLoading?: (value: boolean) => void;
  successMessage?: string;
  refetch?: boolean;
  config?: AxiosRequestConfig;
};

type GetArgs = Omit<Args, 'formData'> & {
  config?: AxiosRequestConfig;
};

interface Service {
  postService: AsyncThunk<any, Args, object>;
  getService: AsyncThunk<any, GetArgs, object>;
}

export default class ThunkService implements Service {
  constructor(endpoint: string) {
    this.postService = createAsyncThunk(
      endpoint,
      async (args: Args, { dispatch, getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const axiosInstance = generateInstance(state, dispatch);
        const {
          formData,
          onSuccess,
          setLoading,
          successMessage,
          onFailure,
          onEnd,
          refetch,
          config,
        } = args;
        try {
          if (setLoading) setLoading(true);
          const response = await axiosInstance.post(endpoint, formData);
          if (onSuccess) onSuccess(response.data);
          if (successMessage) dispatch(showSuccess(successMessage));
          if (refetch) {
            const fetchResponse = await axiosInstance.get(endpoint, {
              ...config,
            });
            return fetchResponse.data;
          }
          return response.data;
        } catch (err) {
          const error = err as any;
          const message = error?.response?.data?.errors[0]?.message;
          if (onFailure) {
            onFailure({
              errors: error?.response?.data?.errors || [],
              message,
            });
          } else {
            dispatch(showError(message));
          }
          return rejectWithValue(error?.response?.data?.errors);
        } finally {
          if (setLoading) setLoading(false);
          if (onEnd) onEnd();
        }
      },
    );
    this.getService = createAsyncThunk(
      endpoint,
      async (args: GetArgs, { dispatch, getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const axiosInstance = generateInstance(state, dispatch);
        const {
          onSuccess,
          config,
          setLoading,
          successMessage,
          onFailure,
          onEnd,
        } = args;
        try {
          if (setLoading) setLoading(true);
          const response = await axiosInstance.get(endpoint, { ...config });
          if (onSuccess) onSuccess(response.data);
          if (successMessage) dispatch(showSuccess(successMessage));
          return response.data;
        } catch (err) {
          const error = err as any;
          const message = error?.response?.data?.errors[0]?.message;
          if (onFailure) {
            onFailure({
              errors: error?.response?.data?.errors[0] || [],
              message,
            });
          } else {
            dispatch(showError(message));
          }
          return rejectWithValue(error?.response?.data?.errors);
        } finally {
          if (setLoading) setLoading(false);
          if (onEnd) onEnd();
        }
      },
    );
  }

  postService;

  getService;
}
