import { createHttpMethods } from './methods';
import { createAxiosInstance } from './config';
import {
  handleRequest,
  handleResponse,
  handleResponseError,
} from './interceptors';

const createHttpClient = () => {
  const client = createAxiosInstance();

  client.interceptors.request.use(handleRequest);
  client.interceptors.response.use(handleResponse, handleResponseError);

  const methods = createHttpMethods(client);

  return {
    ...methods,
    client,
  };
};

export const apiClient = createHttpClient();
