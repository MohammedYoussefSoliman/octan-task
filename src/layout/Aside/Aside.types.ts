import { NavButton } from '@/components/NavButton/NavButton.types';

export type SidebarProps = {
  primaryNavItems: NavButton[];
};

export type MobileSidebarProps = SidebarProps & {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};
