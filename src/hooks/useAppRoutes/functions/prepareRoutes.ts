import { ModuleRoute, SingleRoleModuleRoute } from '@/types/common.types';

import { resolveRoute, ReadyRoute } from './resolveRoute';

const prepareSingleRoleRoute = (
  moduleRoute: ModuleRoute,
): SingleRoleModuleRoute[] => {
  let preparedRoutes: SingleRoleModuleRoute[] = [];
  if (!moduleRoute.roles) moduleRoute.roles = ['public'];
  moduleRoute.roles.forEach((role) => {
    const route = { ...moduleRoute };
    delete route.roles;
    preparedRoutes = [...preparedRoutes, { ...route, role }];
  });
  return preparedRoutes;
};

export const prepareRoutes = (
  moduleRoutes: ModuleRoute[],
  readyRoutes: ReadyRoute[] = [],
): ReadyRoute[] => {
  let preparedSingleRouteModules: SingleRoleModuleRoute[] = [];
  moduleRoutes.forEach((route) => {
    preparedSingleRouteModules = [
      ...preparedSingleRouteModules,
      ...prepareSingleRoleRoute(route),
    ];
  });

  if (!preparedSingleRouteModules.length) {
    return readyRoutes;
  }

  const configuredRoutes = resolveRoute(
    preparedSingleRouteModules[0],
    readyRoutes,
  );
  return prepareRoutes(moduleRoutes.slice(1), configuredRoutes);
};
