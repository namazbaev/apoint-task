import { apiClient, ENDPOINTS } from '~/api';
import type {
  LoginCredentials,
  LoginResponse,
  User,
} from '~/features/auth/types';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '~/shared/constants';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const loginData = await apiClient.post<LoginResponse>(
      `${ENDPOINTS.AUTH.LOGIN}?include=token`,
      credentials,
    );

    const user: User = {
      id: loginData.id,
      status: loginData.status,
      username: loginData.username,
    };

    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_TOKEN_KEY, loginData.token.token);

    return user;
  },

  getUser: (): User | null => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? (JSON.parse(userData) as User) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  isAuthenticated: (): boolean => {
    const user = localStorage.getItem(USER_DATA_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    return !!(token && user);
  },
  logout: (): void => {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
