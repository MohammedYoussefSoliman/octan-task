import React from 'react';

import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';

import { formDataHandler } from '@/helpers/functions';
import urls from '@/helpers/urls';

import { useAppDispatch, useAppSelector } from './reduxHooks';

import logoutService from '@/state/auth/logoutService';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token, user, fireBaseToken } = useAppSelector(
    (state) => state.consumerAuth,
  );

  const getUserPermission = React.useCallback(() => {
    const allPermissions = user.permissions;
    const permissionRoles = Object.keys(allPermissions);
    if (permissionRoles.length <= 0)
      return { view: false, update: false, delete: false, create: false };
    const correctPath = permissionRoles.find((role) => pathname.includes(role));
    if (correctPath) return allPermissions[correctPath];
    return { view: false, update: false, delete: false, create: false };
  }, [pathname, user.permissions]);

  const logout = React.useCallback(async () => {
    let formDataObj = {};
    if (fireBaseToken && fireBaseToken !== 'refused') {
      formDataObj = {
        'device_token[token]': fireBaseToken,
        'device_token[type]': 'web-consumer',
      };
    }
    const formData = formDataHandler({
      ...formDataObj,
    });
    dispatch(
      logoutService({
        formData,
        onSuccess() {
          navigate(urls.home);
        },
      }),
    );
  }, [dispatch, fireBaseToken, navigate]);

  return {
    loggedIn: _.isObject(token),
    token,
    ...user,
    logout,
    getUserPermission,
  };
}
