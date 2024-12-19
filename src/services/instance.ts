import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import {
  logout,
  setRequireNafathAuthentication,
  store,
  RootState,
  setGlobalError,
} from '@/state';

export function getCurrentState(): RootState {
  return store.getState();
}
store.subscribe(getCurrentState);

const {
  consumerAuth: { token },
  ui: { language },
} = getCurrentState();

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
      store.dispatch(logout());
      window.location.replace('/login');
    }
    if (errorResponse.response?.status === 500) {
      store.dispatch(
        setGlobalError({ message: 'unknownError', type: 'error' }),
      );
      window.location.replace('/error');
    }
    if (errorResponse.response?.status === 503) {
      store.dispatch(
        setGlobalError({ message: 'maintenanceInfo', type: 'info' }),
      );
    }
    if (errorResponse.response?.status === 515) {
      store.dispatch(setRequireNafathAuthentication('required'));
    }
    return Promise.reject(errorResponse);
  },
);

export default instance;
