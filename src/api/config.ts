import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { REQUEST_TIMEOUT, VITE_APP_BASE_URL } from '~/shared/constants';

export const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: VITE_APP_BASE_URL,
    timeout: REQUEST_TIMEOUT || 30000,
  });
};
