import { Navigate, Outlet } from 'react-router-dom';

import urls from '@/helpers/urls';

import { ShieldProps } from './Shield.types';

const roles = ['admin', 'user'];

export function Shield({ role }: ShieldProps) {
  if (role === 'public' || role === '*') return <Outlet />;

  if (!roles.includes(role)) return <Navigate to={urls.notFound} replace />;

  return <Outlet />;
}
