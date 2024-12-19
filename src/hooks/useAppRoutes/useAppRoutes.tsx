import { createBrowserRouter } from 'react-router-dom';

import { Shield } from '@/components/Shield';
import ErrorPage from '@/modules/not-found/NotFoundPage';
import { ModuleRoute } from '@/types/common.types';

import { prepareRoutes } from './functions/prepareRoutes';

type AppRoutsHook = {
  rootPath?: string;
  routes: ModuleRoute[];
};

export const useAppRoutes = ({ rootPath, routes }: AppRoutsHook) => {
  const shieldedRoutes = prepareRoutes(
    routes.map((rt) => ({
      ...rt,
    })),

    [],
  ).map((route) => ({
    element: <Shield role={route.role || 'public'} layout={route.layout} />,
    children: route.routes,
  }));

  return createBrowserRouter([
    {
      path: rootPath || '/',
      children: shieldedRoutes,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);
};
