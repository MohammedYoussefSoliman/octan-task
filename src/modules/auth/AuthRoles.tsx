import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAuth } from '@/hooks';

type Props = {
  role: string;
};

export default function AuthRoles({ role }: Props) {
  const auth = useAppSelector((state) => state.consumerAuth);
  const { loggedIn } = useAuth();
  const { user } = auth;
  const location = useLocation();
  const currentRole = loggedIn
    ? user.roles.includes(role) || role === 'public'
    : 'public';
  const guard: boolean = Boolean(currentRole);

  if (!guard)
    return <Navigate to="/access-denied" state={{ from: location }} replace />;

  return <Outlet />;
}
