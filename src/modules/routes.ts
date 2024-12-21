import { ModuleRoute } from '@/types/common.types';

import { aboutRoutes } from './about/routes';
import { accessDeniedRoutes } from './access-denied/routes';
import { accountRoutes } from './account/routes';
import { authRoutes } from './auth/routes';
import { businessRoutes } from './business/routes';
import { faqsRoutes } from './faqs/routes';
import { homeRoutes } from './home/routes';
import { maintenanceRoutes } from './maintenance/routes';
import { notFoundRoutes } from './not-found/routes';
import { ordersRoutes } from './orders/routes';
import { privacyPolicyPageRoutes } from './privacy-policy/routes';
import { serverErrorPageRoute } from './server-error/routes';
import { storeRoutes } from './store/routes';
import { termsAndConditionsRoutes } from './terms-and-conditions/routes';

export const routes: ModuleRoute[] = [
  ...accessDeniedRoutes,
  ...accountRoutes,
  ...authRoutes,
  ...aboutRoutes,
  ...businessRoutes,
  ...notFoundRoutes,
  ...maintenanceRoutes,
  ...homeRoutes,
  ...faqsRoutes,
  ...ordersRoutes,
  ...privacyPolicyPageRoutes,
  ...serverErrorPageRoute,
  ...storeRoutes,
  ...termsAndConditionsRoutes,
];
