import { Navigate } from 'react-router-dom';
import { type PropsWithChildren } from 'react';
import { useAuthContext } from '~/app/providers';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
