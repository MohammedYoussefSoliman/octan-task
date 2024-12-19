import { RouteObject } from 'react-router-dom';

export type RoleType = 'user' | 'public' | '*';

import { LayoutType } from '@/layouts/types';

import { UserRoles, Status } from './enums';

export type ModuleRoute = RouteObject & {
  roles?: string[];
  layout?: LayoutType;
};

export type SingleRoleModuleRoute = RouteObject & {
  role: string;
};

export type Order = {
  id: string;
  customerName: string;
  date: string;
  status: Status;
  total: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRoles;
  active: boolean;
};

export type HTTPResponseType<T> = {
  data: T;
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
};
