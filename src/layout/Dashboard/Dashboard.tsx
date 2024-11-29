import { useState, ReactNode } from 'react';

import { useMediaQuery } from '@uidotdev/usehooks';

import { IconName } from '@/components/Icon/Icon.types';

import { Aside, MobileAside } from '../Aside';

type NavItem = {
  title: string;
  to: string;
  icon: IconName;
};

type DashboardProps = {
  children: ReactNode;
};

const primaryNavItems: NavItem[] = [
  {
    title: 'Orders',
    to: '/',
    icon: 'Package',
  },
  {
    title: 'System users',
    to: '/users',
    icon: 'UserCog',
  },
];

export function Dashboard({ children }: DashboardProps) {
  const isSmallScreen = useMediaQuery('only screen and (max-width : 1280px)');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      <main className="flex min-h-screen w-screen overflow-hidden justify-between bg-neutral-50">
        <Aside primaryNavItems={primaryNavItems} />
        {children}
      </main>
      {isSmallScreen && (
        <MobileAside
          primaryNavItems={primaryNavItems}
          showSidebar={showMobileSidebar}
          setShowSidebar={setShowMobileSidebar}
        />
      )}
    </>
  );
}
