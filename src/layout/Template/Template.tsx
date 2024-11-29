import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { Typography } from '@/components';
import { useAppDispatch } from '@/hooks';
import { setShowMobileAside } from '@/store';

import { Header } from '../Header';

type TemplateProps = {
  title: string;
  children: ReactNode;
};

export function Template({ title, children }: TemplateProps) {
  const dispatch = useAppDispatch();

  return (
    <motion.div className="flex flex-col w-full" layout>
      <Header
        pageTitle={title}
        setShowMobileSidebar={(value) => dispatch(setShowMobileAside(value))}
      />
      <div className="flex flex-col gap-2 p-2 md:p-4 max-h-[calc(100vh-56px)] md:max-h-[calc(100vh-72px)]">
        <Typography as="h2" className="px-2 xl:hidden">
          {title}
        </Typography>
        {children}
      </div>
    </motion.div>
  );
}
