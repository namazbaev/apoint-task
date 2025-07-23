import { useAuth } from '~/features/auth/hooks';
import type { LoginCredentials, User } from '~/features/auth/types';
import { createContext, type PropsWithChildren, useContext } from 'react';

interface AuthContextType {
  loginError: any;
  isLoading: boolean;
  logout: () => void;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  user: User | null | undefined;
  login: (credentials: LoginCredentials) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
