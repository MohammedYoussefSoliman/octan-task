/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { resolvePermissions } from '@/helpers/functions';

import { AuthState } from '../types';

import loginService from './loginService';
import logoutService from './logoutService';
import profileService from './profileService';
import registerService from './registerService';

const { getService: getUserProfile, postService: updateUserProfile } =
  profileService;

const customerNamesInitialState = {
  ar: {
    firstName: '',
    secondName: '',
    thirdName: '',
    lastName: '',
  },
  en: {
    firstName: '',
    secondName: '',
    thirdName: '',
    lastName: '',
  },
};

const initialState: AuthState = {
  token: null,
  rememberMe: false,
  updateNationalId: false,
  user: {
    roles: ['consumer'],
    first_name: '',
    last_name: '',
    phone_number: '',
    customer_names: customerNamesInitialState,
    permissions: {},
  },
  fireBaseToken: '',
  nafathVerificationStatus: 'initial',
  requireNafathStep: false,
};

const authInit = (state: AuthState, action: PayloadAction<any>) => {
  const { accessToken } = action.payload.records;
  return {
    ...state,
    token: {
      value: `${accessToken.type} ${accessToken.token}`,
      expirationDate: new Date(accessToken.expires_at * 1000),
    },
  };
};

const doLogout = (state: AuthState) => ({
  token: null,
  rememberMe: false,
  user: {
    roles: [],
    first_name: '',
    last_name: '',
    phone_number: '',
    customer_names: customerNamesInitialState,
    permissions: {},
  },
  fireBaseToken: state.fireBaseToken,
  nafathVerificationStatus: 'initial' as AuthState['nafathVerificationStatus'],
  requireNafathStep: false,
});

const updateUserState = (state: AuthState, action: PayloadAction<any>) => {
  const {
    phone_number,
    date_of_birth,
    national_id,
    status,
    first_name,
    last_name,
    avatar,
    id,
    customer_names,
    permissions,
    nafath_verified_at,
  } = action.payload.records;
  return {
    ...state,
    user: {
      roles: ['consumer'],
      phone_number,
      date_of_birth,
      nafath_verified_at,
      national_id,
      status,
      avatar,
      first_name,
      last_name,
      customer_names,
      id,
      permissions: resolvePermissions(
        permissions || [
          'orders-view',
          'orders-update',
          'hambozo-delete',
          'invoices-update',
          'invoices-update',
          'admin',
        ],
      ),
    },
    nafathVerificationStatus: nafath_verified_at
      ? 'verified'
      : ('initial' as AuthState['nafathVerificationStatus']),
  };
};

const slice = createSlice({
  name: 'app/authentication',
  initialState,
  reducers: {
    logout: doLogout,
    setRememberMe(state, action: PayloadAction<boolean>) {
      return { ...state, rememberMe: action.payload };
    },
    setFireBaseToken(state, action: PayloadAction<string>) {
      return { ...state, fireBaseToken: action.payload };
    },
    setUpdateNationalId(state, action: PayloadAction<boolean>) {
      return { ...state, updateNationalId: action.payload };
    },
    setRequireNafathAuthentication(
      state,
      action: PayloadAction<AuthState['nafathVerificationStatus']>,
    ) {
      state.nafathVerificationStatus = action.payload;
      if (action.payload === 'verified') state.requireNafathStep = true;
    },
    setRequireNafathStep(state, action: PayloadAction<boolean>) {
      state.requireNafathStep = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.fulfilled, updateUserState)
      .addCase(getUserProfile.rejected, (state: AuthState) => state)
      .addCase(updateUserProfile.fulfilled, updateUserState)
      .addCase(updateUserProfile.rejected, (state: AuthState) => state)
      .addCase(loginService.rejected, (state: AuthState) => state)
      .addCase(loginService.fulfilled, authInit)
      .addCase(loginService.rejected, () => initialState)
      .addCase(logoutService.fulfilled, doLogout)
      .addCase(logoutService.rejected, doLogout)
      .addCase(registerService.fulfilled, authInit)
      .addCase(registerService.rejected, () => initialState);
  },
});

export const {
  setRememberMe,
  logout,
  setFireBaseToken,
  setRequireNafathAuthentication,
  setUpdateNationalId,
  setRequireNafathStep,
} = slice.actions;
export default slice.reducer;
