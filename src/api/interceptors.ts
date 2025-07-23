import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAuthToken, handleLogout } from './auth';

export const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const handleResponse = (response: AxiosResponse) => response;

export const handleResponseError = (error: AxiosError) => {
  const status = error.response?.status;

  if (status === 401) {
    handleLogout();
  }
  return Promise.reject(error);
};
