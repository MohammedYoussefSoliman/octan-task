import { useTheme } from '@emotion/react';

import { H6, P3, Figure, Flex } from '@/components';

import { OrderBadge } from './styles';

type Props = {
  orderId: number;
  name: string;
  logo: string | null;
};

export default function StepHeader({ orderId, name, logo }: Props) {
  const {
    pallet,
    branding: { isEnabled: isBranded, primaryColor },
  } = useTheme();

  return (
    <Flex
      direction={{
        xs: 'column',
        md: 'row',
      }}
      justify="space-between"
      gap={{ xs: 12, md: 24 }}
      fullWidth
    >
      <Flex gap={20} align="center">
        <Figure url={logo} alt={name} dense withPadding />
        <H6 text={name} />
      </Flex>
      <Flex
        align="center"
        gap={{ xs: 4, md: 16 }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <P3
          text="orderNumber"
          endAdornment=":"
          color={pallet.text.heading}
          capitalizeFirstLetter
        />
        <OrderBadge isBranded={isBranded}>
          <P3 text={`#${orderId}`} color={primaryColor} />
        </OrderBadge>
      </Flex>
    </Flex>
  );
}
