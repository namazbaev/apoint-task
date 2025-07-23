import React, { useCallback, useState } from 'react';
import { useAuthContext } from '~/app/providers';
import type { LoginCredentials } from '../types/auth.types';

interface ValidationErrors {
  username?: string;
  password?: string;
}

interface UseLoginFormReturn {
  loginError: any;
  isFormValid: boolean;
  isLoggingIn: boolean;
  errors: ValidationErrors;
  credentials: LoginCredentials;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const { login, isLoggingIn, loginError } = useAuthContext();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const validateUsername = (username: string): string | undefined => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    return undefined;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setCredentials((prev) => ({ ...prev, [name]: value }));

      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      username: validateUsername(credentials.username),
      password: validatePassword(credentials.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    login(credentials).catch((error) => {
      console.error('Login failed:', error);
    });
  };

  const isFormValid =
    credentials.username.length >= 3 && credentials.password.length >= 6;

  return {
    credentials,
    errors,
    isFormValid,
    handleInputChange,
    handleSubmit,
    isLoggingIn,
    loginError,
  };
};
