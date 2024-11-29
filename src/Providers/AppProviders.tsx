import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store';

import AppSetup from './AppSetup';

export default function AppProviders() {
  return (
    <ReduxProvider store={store}>
      <Suspense fallback={null}>
        <AppSetup />
      </Suspense>
    </ReduxProvider>
  );
}
