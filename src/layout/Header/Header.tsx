import { Typography, IconButton } from '@/components';

import { HeaderProps } from './Header.types';

export function Header({ pageTitle, setShowMobileSidebar }: HeaderProps) {
  return (
    <header className="h-[56px] md:h-[72px] border-b border-border bg-white flex items-center justify-between px-4">
      <div className="flex items-center">
        <IconButton
          iconName="Menu"
          onClick={() => setShowMobileSidebar(true)}
          className="xl:hidden"
        />
        <Typography as="h2" className="font-bold mx-2 hidden xl:block">
          {pageTitle || 'dashboard'}
        </Typography>
      </div>
    </header>
  );
}
