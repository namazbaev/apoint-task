import type { ApiResponse } from '~/shared/types';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createHttpMethods = (client: AxiosInstance) => {
  const get = async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await client.get<ApiResponse<T>>(url, config);
    return response.data;
  };

  const post = async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await client.post<T>(url, data, config);
    return response.data;
  };

  const put = async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await client.put<T>(url, data, config);
    return response.data;
  };

  const patch = async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  };

  const del = async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await client.delete<ApiResponse<T>>(url, config);
    return response.data;
  };

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  };
};
