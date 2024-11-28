import { RouteObject } from 'react-router-dom';

export type RoleType = 'user' | 'public' | '*';

import { UserRoles, Status } from './enums';

export type ModuleRoute = RouteObject & {
  roles?: string[];
};

export type SingleRoleModuleRoute = RouteObject & {
  role: string;
};

export type Order = {
  id: number;
  customerName: string;
  date: string;
  status: Status;
  total: number;
  currency: 'EGP' | 'USD' | 'SAR';
};

export type User = {
  id: number;
  name: string;
  email: string;
  status: UserRoles;
  active: boolean;
};
