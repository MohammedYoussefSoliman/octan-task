import { ModuleRoute } from '@/types/common.types';

import NotFoundPage from './NotFoundPage';

export const notFoundRoutes: ModuleRoute[] = [
  {
    layout: 'empty',
    path: '/404',
    element: <NotFoundPage />,
  },
];
