import { ModuleRoute } from '@/types/common.types';

import AccessDeniedPage from './AccessDeniedPage';

export const accessDeniedRoutes: ModuleRoute[] = [
  {
    layout: 'empty',
    path: '/access-denied',
    element: <AccessDeniedPage />,
  },
];
