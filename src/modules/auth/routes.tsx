import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import FailedStatusPage from './pages/FailedStatusPage';
import LoginPage from './pages/LoginPage';
import NafathValidatePage from './pages/NafathValidatePage';
import SuccessStatusPage from './pages/SuccessStatusPage';

export const authRoutes: ModuleRoute[] = [
  {
    layout: 'empty',
    path: urls.login,
    element: <LoginPage />,
  },
  {
    layout: 'empty',
    path: urls.verifyNafath,
    element: <NafathValidatePage />,
  },
  {
    layout: 'empty',
    path: urls.loginSuccess,
    element: <SuccessStatusPage />,
  },
  {
    layout: 'empty',
    path: urls.loginFailed,
    element: <FailedStatusPage />,
  },
];
