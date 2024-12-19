import { matchRoutes, useLocation } from 'react-router-dom';

const useCurrentRoute = (path: string) => {
  const routes = [{ path }];
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);
  if (matchedRoutes) {
    const [{ route }] = matchedRoutes;
    return route.path;
  }

  return null;
};

export default useCurrentRoute;
