import React from 'react';

import moment from 'moment';
import { Beforeunload } from 'react-beforeunload';

import { WhatsappLink } from '@/components';
import { useAppSelector, useAppDispatch, useAuth } from '@/hooks';
import { AppEffects } from '@/Providers';

import Footer from './Footer';
import Header from './Header';
import LayoutWrapper from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const {
    consumerAuth: { rememberMe, token },
  } = useAppSelector((state) => state);

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
            <Header />
            {children}
            <Footer small />
          </main>
          <WhatsappLink />
        </LayoutWrapper>
      </Beforeunload>
    </AppEffects>
  );
}
