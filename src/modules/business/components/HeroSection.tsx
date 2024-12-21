import React from 'react';

import { useTheme } from '@emotion/react';

import { Flex } from '@/components/Grids';
import { H1, P1 } from '@/components/Typography';

import { TrustedByType } from '../types';

import JoinUs from './JoinUs';
import TrustedBy from './TrustedBy';

type Props = {
  title: string;
  description: string;
  trustedBy: TrustedByType;
};

function BusinessHeroSection({ title, description, trustedBy }: Props) {
  const { pallet } = useTheme();

  return (
    <Flex
      direction="column"
      fullWidth
      gap={{ xs: 21, sm: 24, lg: 32 }}
      align="center"
      justify="center"
      pt={120}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={{ xs: 21, sm: 24 }}
        fullWidth
        mb={{ xs: 24 }}
      >
        <H1 text={title} color={pallet.primary[600]} />
        <P1 text={description} color={pallet.text.white} />
      </Flex>
      <JoinUs />
      {trustedBy.logos && trustedBy.logos.length > 0 && (
        <TrustedBy {...trustedBy} />
      )}
    </Flex>
  );
}

export default React.memo(BusinessHeroSection);
