import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import urls from '@/helpers/urls';

import { useAppDispatch, useAppSelector } from './reduxHooks';
import useAuth from './useAuth';

import { setRequireNafathAuthentication, setGlobalError } from '@/state';

export default function useAxiosInstance(language?: 'en' | 'ar') {
  const token = useAppSelector((state) => state.consumerAuth.token);
  const stateLang = useAppSelector((state) => state.ui.language);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_baseUrl,
    transformRequest: [
      (data, headers) => {
        if (token) {
          headers!.Authorization = token.value;
        }
        headers!.os = 'web';
        headers!.language = language || stateLang;
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
        logout();
        navigate('/login');
      }
      if (errorResponse.response?.status === 500) {
        dispatch(setGlobalError({ message: 'unknownError', type: 'error' }));
        navigate(urls.error);
      }
      if (errorResponse.response?.status === 503) {
        dispatch(setGlobalError({ message: 'maintenanceInfo', type: 'info' }));
        navigate(urls.maintenance);
      }
      if (errorResponse.response?.status === 515) {
        dispatch(setRequireNafathAuthentication('required'));
      }
      return Promise.reject(errorResponse);
    },
  );

  return instance;
}
