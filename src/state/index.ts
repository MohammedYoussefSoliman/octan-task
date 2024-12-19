/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import authSlice from './auth/slice';
import globalsSlice from './globals/slice';
import orderSlice from './order/slice';
import uiSlice from './ui/slice';
import uiActionsSlice from './ui-actions/slice';

const rootReducer = combineReducers({
  // IMPORTANT keep the ui-actions as the first reducer
  uiActions: uiActionsSlice,
  ui: uiSlice,
  consumerAuth: authSlice,
  globals: globalsSlice,
  consumerOrder: orderSlice,
});

const persistConfig = {
  key: 'consumer-yammpay-storage',
  storage,
  whitelist: ['ui', 'consumerAuth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware: any[] = [];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export actions
export * from './ui';
export * from './auth/slice';
export * from './globals/slice';
export * from './ui-actions/slice';
export * from './order';
