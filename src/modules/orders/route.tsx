import { lazy } from 'react';

import { ModuleRoute } from '@/types/common.types';

const OrdersPage = lazy(() => import('./OrdersPage'));
const OrderPage = lazy(() => import('./OrderPage'));

export const ordersRoutes: ModuleRoute[] = [
  {
    path: '/',
    element: <OrdersPage />,
    index: true,
    roles: ['admin'],
  },
  {
    path: '/:id',
    element: <OrderPage />,
    roles: ['admin'],
  },
];
