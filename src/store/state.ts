/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import ordersSlice from './orders';
import uiSlice from './ui';
import usersSlice from './users';

// Slices

const rootReducer = combineReducers({
  ui: uiSlice,
  orders: ordersSlice,
  users: usersSlice,
});

const middleware: any[] = [];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
