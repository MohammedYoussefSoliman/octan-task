import React from 'react';

import { Logo, Flex, Paper } from '@/components';

type Props = {
  children: React.ReactNode;
};

export default function AuthPaper({ children }: Props) {
  return (
    <Flex
      direction="column"
      justify="center"
      fullHeight
      fullWidth
      gap={{ xs: 20, md: 40, lg: 70 }}
      p={{
        xs: '16px 16px 50px',
        sm: '16px 24px 50px',
        md: '20px 42px 32px',
        lg: '28px 64px 48px',
        xl: '28px 100px 80px',
      }}
    >
      <Logo color="white" size={120} />
      <Paper
        direction="column"
        justify="center"
        align="center"
        gap={{ xs: 10, md: 20, lg: 40 }}
        fullWidth
        flex={1}
      >
        {children}
      </Paper>
    </Flex>
  );
}
