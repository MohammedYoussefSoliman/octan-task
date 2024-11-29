import { motion } from 'framer-motion';
import { useState } from 'react';

import { NavButton, IconButton } from '@/components';

import { SidebarProps } from './Aside.types';

export const Aside = ({ primaryNavItems }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.aside
      animate={{ width: expanded ? '240px' : '56px' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative  z-10 shrink-0 hidden flex-col border-border bg-white xl:flex space-y-2 overflow-hidden border-r"
    >
      <div className="space-y-2 p-2">
        <IconButton
          iconName={expanded ? 'ArrowLeftFromLine' : 'ArrowRightFromLine'}
          className="ms-auto"
          onClick={() => setExpanded(!expanded)}
          variant="ghost"
        />
        <nav className="flex flex-col gap-1">
          {primaryNavItems.map((navItem) => (
            <NavButton key={navItem.title} {...navItem} expanded={expanded} />
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};
