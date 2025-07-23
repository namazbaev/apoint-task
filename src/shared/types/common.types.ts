import React from 'react';

export interface RouteConfig {
  path: string;
  title?: string;
  isProtected?: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}
