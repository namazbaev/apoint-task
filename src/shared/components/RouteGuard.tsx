import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '~/app/providers';
import { PageLoader } from './PageLoader';
import { ErrorBoundary } from './ErrorBoundary';

interface RouteGuardProps {
  isProtected?: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

export const RouteGuard = ({
  component: Component,
  isProtected = false,
}: RouteGuardProps) => {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <PageLoader />;
  }

  // Redirect to login if protected and not authenticated
  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to materials if trying to access login while authenticated
  if (!isProtected && isAuthenticated && pathname === '/login') {
    return <Navigate to="/materials" replace />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};
