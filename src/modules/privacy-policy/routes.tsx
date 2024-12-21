import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import PrivacyPolicyPage from './PrivacyPolicyPage';

export const privacyPolicyPageRoutes: ModuleRoute[] = [
  {
    path: urls.privacy,
    element: <PrivacyPolicyPage />,
  },
];
