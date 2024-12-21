import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import BusinessPage from './BusinessPage';

export const businessRoutes: ModuleRoute[] = [
  {
    path: urls.business,
    element: <BusinessPage />,
  },
];
