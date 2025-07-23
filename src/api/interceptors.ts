import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAuthToken, handleLogout } from './auth';
import { normalizeError } from './errors';

export const handleRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
};

export const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const handleResponseError = (error: AxiosError): Promise<never> => {
  if (error.response?.status === 401) {
    handleLogout();
  }

  const normalizedError = normalizeError(error);
  const errorObject = new Error(normalizedError.message as string);
  (errorObject as unknown).status = normalizedError.status;

  return Promise.reject(errorObject);
};
