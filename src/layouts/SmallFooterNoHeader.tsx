import React from 'react';

import moment from 'moment';
import { Beforeunload } from 'react-beforeunload';

import { WhatsappLink } from '@/components';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { AppEffects } from '@/Providers';

import Footer from './Footer';
import LayoutWrapper from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { rememberMe, token } = useAppSelector((state) => state.consumerAuth);

  const { logout } = useAuth();

  React.useEffect(() => {
    if (moment(token?.expirationDate).isBefore()) {
      logout();
    }
  }, [logout, token]);

  return (
    <AppEffects>
      <Beforeunload
        onBeforeunload={() => {
          if (!rememberMe) {
            dispatch(logout());
          }
        }}
      >
        <LayoutWrapper data-testid="app-layout">
          <main className="content">
            {children}
            <Footer small />
          </main>
          <WhatsappLink />
        </LayoutWrapper>
      </Beforeunload>
    </AppEffects>
  );
}
