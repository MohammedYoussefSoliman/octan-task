import React from 'react';

import { Snackbar } from '@/components';
import { useAppSelector, useAuth } from '@/hooks';
import NafathRevalidation from '@/modules/auth/NafathRevalidation';

type AppEffectsProps = {
  children: React.ReactNode;
};

export function AppEffects({ children }: AppEffectsProps) {
  const snackbar = useAppSelector((state) => state.uiActions.snackbar);
  const nafathVerificationStatus = useAppSelector(
    (state) => state.consumerAuth.nafathVerificationStatus,
  );

  const { loggedIn } = useAuth();

  return (
    <>
      {children}
      {snackbar?.message && <Snackbar {...snackbar} />}
      {loggedIn && nafathVerificationStatus === 'required' && (
        <NafathRevalidation />
      )}
    </>
  );
}
