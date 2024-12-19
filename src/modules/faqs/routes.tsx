import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import FaqsPage from './FaqsPage';

export const faqsRoutes: ModuleRoute[] = [
  {
    layout: 'normal',
    path: urls.faqs,
    element: <FaqsPage />,
  },
];
