import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import MaintenancePage from './MaintenancePage';

export const maintenanceRoutes: ModuleRoute[] = [
  {
    layout: 'empty',
    path: urls.maintenance,
    element: <MaintenancePage />,
  },
];
