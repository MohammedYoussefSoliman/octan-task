import { lazy } from 'react';

import { ModuleRoute } from '@/types/common.types';

const OrdersPage = lazy(() => import('./OrdersPage'));

export const ordersRoutes: ModuleRoute[] = [
  {
    path: '/',
    element: <OrdersPage />,
    index: true,
    roles: ['admin'],
  },
];
