import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import { P2, P3 } from '@/components/Typography';
import devices from '@/theme/sizes';

type Props = {
  label: string;
  logo?: string;
  price: string;
};

const Image = styled.img`
  width: 48px;
  height: 32px;
  object-fit: contain;
  ${devices.md} {
    height: 36px;
  }
`;

export default function AsyncLabel({ label, logo, price }: Props) {
  const { pallet, branding } = useTheme();

  return (
    <Flex
      align="center"
      gap={{ xs: 6, md: 8, lg: 16 }}
      justify="space-between"
      fullWidth
    >
      <Flex align="center" gap={{ xs: 6, md: 8, lg: 16 }}>
        {logo && <Image src={logo} alt="logo" />}
        <P3 text={label} />
      </Flex>
      <P2
        text={price}
        color={branding.primaryColor ?? pallet.primary[600]}
        weight={500}
      />
    </Flex>
  );
}
