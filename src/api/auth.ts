import { AUTH_LOGOUT_EVENT_KEY, AUTH_TOKEN_KEY } from '~/shared/constants';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const handleLogout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT_KEY));
};
