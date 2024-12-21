import { ModuleRoute } from '@/types/common.types';

import HomeError from './error';
import Visitor from './pages/Visitor';

export const homeRoutes: ModuleRoute[] = [
  {
    layout: 'normal',
    path: '/',
    element: <Visitor />,
  },
  {
    layout: 'no-footer',
    path: '/home/error',
    element: <HomeError />,
  },
];
