import React from 'react';

import moment from 'moment';
import { Beforeunload } from 'react-beforeunload';

import { WhatsappLink } from '@/components';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { AppEffects } from '@/Providers';

import Footer from './Footer';
import Header from './Header';
import LayoutWrapper from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const rememberMe = useAppSelector((state) => state.consumerAuth.rememberMe);
  const token = useAppSelector((state) => state.consumerAuth.token);

  const { logout } = useAuth();

  React.useEffect(() => {
    if (!token) return;
    if (moment(token?.expirationDate).isBefore()) {
      logout();
    }
  }, [dispatch, logout, token]);

  return (
    <AppEffects>
      <Beforeunload
        onBeforeunload={() => {
          if (!token) return;
          if (token && !rememberMe) {
            logout();
          }
        }}
      >
        <LayoutWrapper data-testid="app-layout">
          <main className="content">
            <Header />
            {children}
            <Footer />
          </main>
          <WhatsappLink />
        </LayoutWrapper>
      </Beforeunload>
    </AppEffects>
  );
}
