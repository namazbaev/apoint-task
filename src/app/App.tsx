import React from 'react';
import { router } from '~/routes';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';

const App: React.FC = () => (
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>
);

export default App;
