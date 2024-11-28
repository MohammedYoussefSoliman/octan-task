import { lazy } from 'react';

import { ModuleRoute } from '@/types/common.types';

const NotFoundPage = lazy(() => import('./NotFoundPage'));

export const notFoundRoutes: ModuleRoute[] = [
  {
    path: '/404',
    element: <NotFoundPage />,
  },
];
