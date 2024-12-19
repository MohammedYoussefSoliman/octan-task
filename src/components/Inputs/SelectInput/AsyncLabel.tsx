import React from 'react';

import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

import { P3 } from '../../Typography';

type Props = {
  label: string;
  logo?: string;
};

const Image = styled.img`
  width: 48px;
  height: 30px;
  object-fit: contain;
`;

export default function AsyncLabel({ label, logo }: Props) {
  return (
    <Flex align="center" gap={{ xs: 6, md: 8, lg: 16 }}>
      {logo && <Image src={logo} alt="logo" />}
      <P3 text={label} />
    </Flex>
  );
}
