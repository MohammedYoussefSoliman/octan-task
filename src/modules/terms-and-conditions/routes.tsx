import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import TermsAndConditionsPage from './TermsPage';

export const termsAndConditionsRoutes: ModuleRoute[] = [
  {
    path: urls.terms,
    element: <TermsAndConditionsPage />,
  },
];
