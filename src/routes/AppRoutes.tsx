import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouteGuard } from '~/shared/components/RouteGuard';
import type { RouteConfig } from '~/shared/types/common.types';
import { NotFoundPage } from '~/app/pages';

const LoginPage = lazy(() => import('~/features/auth/pages/LoginPage'));
const MaterialsPage = lazy(
  () => import('~/features/materials/pages/MaterialsPage'),
);

// Route definitions with metadata
const routes: RouteConfig[] = [
  {
    path: '/login',
    component: LoginPage,
    isProtected: false,
    title: 'Login',
  },
  {
    path: '/',
    component: MaterialsPage,
    isProtected: true,
    title: 'Materials Report',
  },
];

// HOC for route creation
const createRouteElement = (route: RouteConfig) => (
  <RouteGuard component={route.component} isProtected={route.isProtected} />
);

// Create router with optimized config
export const router = createBrowserRouter([
  ...routes.map((route) => ({
    path: route.path,
    element: createRouteElement(route),
  })),

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

// Export route constants
export const ROUTES = {
  LOGIN: '/login',
  MATERIALS: '/',
} as const;
