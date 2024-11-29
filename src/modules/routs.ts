import { ModuleRoute } from '@/types/common.types';

import { notFoundRoutes } from './not-found/route';
import { ordersRoutes } from './orders/route';
import { usersRoutes } from './users/route';

export const routes: ModuleRoute[] = [
  ...notFoundRoutes,
  ...ordersRoutes,
  ...usersRoutes,
];
