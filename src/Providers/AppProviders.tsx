import { Suspense } from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@/locales';
import { LoadingScreen } from '@/components';
import { store, persister } from '@/state';

import { AppSetup } from './AppSetup';

export default function AppProviders() {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persister}>
          <Suspense fallback={<LoadingScreen />}>
            <AppSetup />
          </Suspense>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  );
}
