import { IconName } from '@/components/Icon/Icon.types';

export type NavButton = {
  title: string;
  to: string;
  icon: IconName;
};

export type NavButtonProps = NavButton & {
  expanded?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
};
