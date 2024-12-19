import { Navigate, Outlet } from 'react-router-dom';

import urls from '@/helpers/urls';
import { useAuth } from '@/hooks';
import { layouts } from '@/layouts';

import { ShieldProps } from './Shield.types';

export function Shield({ role, layout = 'normal' }: ShieldProps) {
  const Layout = layouts[layout];

  const { loggedIn, roles: userRoles } = useAuth();

  if (role === 'public' || role === '*')
    return (
      <Layout>
        <Outlet />
      </Layout>
    );

  if (!loggedIn) return <Navigate to={urls.login} replace />;

  if (loggedIn && !userRoles.includes(role))
    return <Navigate to="/access-denied" replace />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
