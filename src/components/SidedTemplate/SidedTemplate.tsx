import React from 'react';

import { Flex, Logo } from '@/components';

import Side from './styles';

type Props = {
  children: React.ReactNode;
};

export default function SidedTemplate({ children }: Props) {
  return (
    <Flex
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      fullWidth
      fullHeight
    >
      <Side
        pv={{ xs: '44px' }}
        className="left"
        align="center"
        justify="center"
      >
        <Logo
          color="white"
          size={{
            xs: 130,
            sm: 135,
            md: 150,
            lg: 250,
            xl: 360,
            xxl: 500,
          }}
        />
      </Side>
      <Side
        p={{ xs: '32px', md: '48px', xxl: '110px' }}
        justify="center"
        className="right"
        direction="column"
      >
        {children}
      </Side>
    </Flex>
  );
}
