import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import type { User } from '../types/auth.types';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user from localStorage
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => {
      const user = authService.getUser();
      const isAuthenticated = authService.isAuthenticated();

      if (!isAuthenticated) {
        return null;
      }

      return user;
    },
    staleTime: Infinity, // Don't refetch, data comes from localStorage
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (userData: User) => {
      queryClient.setQueryData(['auth', 'user'], userData);

      window.location.href = '/materials';
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Logout function
  const logout = () => {
    authService.logout();

    // Clear all query cache
    queryClient.clear();

    // Update auth query
    queryClient.setQueryData(['auth', 'user'], null);

    // Navigate to login
    window.location.href = '/login';
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
  };
};
