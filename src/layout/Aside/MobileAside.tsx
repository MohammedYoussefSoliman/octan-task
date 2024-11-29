import { AnimatePresence, motion } from 'framer-motion';

import { NavButton } from '@/components';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setShowMobileAside } from '@/store';

import { MobileSidebarProps } from './Aside.types';

export const MobileAside = ({ primaryNavItems }: MobileSidebarProps) => {
  const dispatch = useAppDispatch();
  const showMobileAside = useAppSelector((state) => state.ui.showMobileAside);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.aside
          animate={{
            x: showMobileAside ? '0' : '-100%',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute w-60 inset-y-0 z-20 flex-col border-border bg-white flex space-y-2 justify-between overflow-hidden border-r left-0"
        >
          <div className="space-y-2 p-2">
            <nav className="flex flex-col gap-1">
              {primaryNavItems.map((navItem) => (
                <NavButton
                  key={navItem.title}
                  expanded
                  onClick={() => dispatch(setShowMobileAside(false))}
                  isMobile
                  {...navItem}
                />
              ))}
            </nav>
          </div>
        </motion.aside>
      </AnimatePresence>
      <AnimatePresence>
        {showMobileAside && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/50 z-10 animate"
            onClick={() => dispatch(setShowMobileAside(false))}
          />
        )}
      </AnimatePresence>
    </>
  );
};
