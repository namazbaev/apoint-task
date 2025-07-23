import type { AxiosError } from 'axios';
import type { ApiError } from '~/shared/types';

export const normalizeError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || error.message,
      status: error.response.status,
    };
  }

  if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  }

  return {
    message: error.message,
    status: 500,
  };
};
