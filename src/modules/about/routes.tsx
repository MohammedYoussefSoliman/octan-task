import { ModuleRoute } from '@/types/common.types';

import AboutPage from './AboutPage';

export const aboutRoutes: ModuleRoute[] = [
  {
    path: '/about',
    element: <AboutPage />,
  },
];
