import React from 'react';

import { WhatsappLink } from '@/components';

import LayoutWrapper from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutWrapper className="empty" data-testid="app-layout">
      <main className="content">{children}</main>
      <WhatsappLink />
    </LayoutWrapper>
  );
}
