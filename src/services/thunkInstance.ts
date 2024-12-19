import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { RootState, logout, setRequireNafathAuthentication } from '@/state';
import { setGlobalError } from '@/state/globals/slice';

function generateInstance(
  state: RootState,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
): AxiosInstance {
  const { token } = state.consumerAuth;
  const { language } = state.ui;

  const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_baseUrl,
    transformRequest: [
      (data, headers) => {
        if (token) {
          headers!.Authorization = token.value;
        }
        headers!.os = 'web';
        headers!.language = language;
        // headers!["content-type"] = "application/json";
        return data;
      },
    ],
  });
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data.data) response.data = response.data.data;
      return response;
    },
    (errorResponse: AxiosError) => {
      if (errorResponse.response?.status === 401) {
        dispatch(logout());
        window.location.replace('/login');
      }
      if (errorResponse.response?.status === 500) {
        dispatch(setGlobalError({ message: 'unknownError', type: 'error' }));
        window.location.replace('/error');
      }
      if (errorResponse.response?.status === 503) {
        dispatch(setGlobalError({ message: 'maintenanceInfo', type: 'info' }));
      }
      if (errorResponse.response?.status === 515) {
        dispatch(setRequireNafathAuthentication('required'));
      }
      return Promise.reject(errorResponse);
    },
  );
  return instance;
}

export default generateInstance;
