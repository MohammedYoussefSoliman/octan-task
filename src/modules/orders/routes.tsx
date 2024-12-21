import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import CreateOrderPage from './CreateOrderPage';
import FailedToCompletePage from './FailedToCompletePage';
import OrderPage from './OrderPage';
import OrdersPage from './OrdersPage';
import SuccessStatusPage from './SuccessStatusPage';

export const ordersRoutes: ModuleRoute[] = [
  {
    layout: 'small-footer-no-header',
    path: '/create-order',
    element: <CreateOrderPage />,
  },
  {
    layout: 'small-footer-no-header',
    path: '/orders/successfully-created',
    element: <SuccessStatusPage />,
    roles: ['consumer'],
  },
  {
    layout: 'small-footer-no-header',
    path: '/orders/failed-order',
    element: <FailedToCompletePage />,
    roles: ['consumer'],
  },
  {
    layout: 'no-footer',
    path: '/orders/:orderId',
    element: <OrderPage />,
    roles: ['consumer'],
  },
  {
    layout: 'small-footer',
    path: urls.orders,
    element: <OrdersPage />,
    roles: ['consumer'],
  },
];
