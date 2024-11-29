import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

import { Icon } from '@/components';
import { cn } from '@/utils';

import { NavButtonProps } from './NavButton.types';

export const NavButton = ({
  title,
  to,
  icon,
  expanded = false,
  onClick,
  isMobile = false,
}: NavButtonProps) => {
  return (
    <NavLink to={to} onClick={onClick}>
      {({ isActive }) => (
        <motion.div
          layout
          transition={{
            layout: {
              delay: expanded ? 0 : 0.1,
              duration: 0.2,
            },
          }}
          className={cn(
            'relative flex items-center justify-between gap-0.5 rounded-lg text-neutral-600 transition-colors p-1',
            {
              'text-indigo-500': isActive,
              'bg-indigo-50': isActive && isMobile,
            },
            {
              'hover:bg-neutral-100': !isActive,
            },
          )}
        >
          <div className="flex items-center">
            <span className="flex items-center justify-center h-9 w-9 md:h-8 md:w-8 ">
              {icon && <Icon name={icon} size={18} />}
            </span>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, x: -2 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: -2,
                    transition: { delay: 0 },
                  }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-sm whitespace-nowrap font-medium"
                >
                  {title}
                </motion.span>
              )}
            </AnimatePresence>
            {!expanded && <span className="sr-only">{title}</span>}
          </div>
          <AnimatePresence>
            {expanded && isActive && (
              <motion.span
                initial={{ opacity: 0, x: -2 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, transition: { delay: 0 } }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <Icon
                  name="ChevronRight"
                  className="h-4 w-4 mr-1 text-indigo-400"
                />
              </motion.span>
            )}
          </AnimatePresence>
          {isActive && !isMobile ? (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 -z-10 rounded-lg bg-indigo-50"
            />
          ) : null}
        </motion.div>
      )}
    </NavLink>
  );
};
