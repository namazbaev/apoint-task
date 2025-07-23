export interface User {
  id: number;
  username: string;
  status: number;
}

export interface TokenData {
  id: number;
  user_id: number;
  created_at: number;
  updated_at: number | null;
  last_used_at: number;
  expires: number;
  user_agent: string | null;
  token: string;
  data: any;
  status: number;
  type: string | null;
  phone: string | null;
  position_id: number | null;
}

export interface LoginResponse {
  id: number;
  status: number;
  username: string;
  token: TokenData;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
