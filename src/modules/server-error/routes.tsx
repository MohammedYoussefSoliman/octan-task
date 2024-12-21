import { ModuleRoute } from '@/types/common.types';

import ServerErrorPage from './ServerErrorPage';

export const serverErrorPageRoute: ModuleRoute[] = [
  {
    layout: 'empty',
    path: '/error',
    element: <ServerErrorPage />,
  },
];
