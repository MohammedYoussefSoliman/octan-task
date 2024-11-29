import { lazy } from 'react';

import { ModuleRoute } from '@/types/common.types';

const UsersPage = lazy(() => import('./UsersPage'));

export const usersRoutes: ModuleRoute[] = [
  {
    path: '/users',
    element: <UsersPage />,
    roles: ['admin'],
  },
];
