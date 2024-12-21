import urls from '@/helpers/urls';
import { ModuleRoute } from '@/types/common.types';

import StoreById from './StoreById';
import StorePage from './StorePage';

export const storeRoutes: ModuleRoute[] = [
  {
    path: `${urls.store}/:storeId`,
    element: <StoreById />,
  },
  {
    path: `${urls.store}`,
    element: <StorePage />,
    layout: 'empty',
  },
];
