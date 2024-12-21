import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import AccountPage from './AccountPage';

export const accountRoutes: ModuleRoute[] = [
  {
    path: urls.account,
    element: <AccountPage />,
  },
];
