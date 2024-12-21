import { useTheme } from '@emotion/react';

import { Flex, AnimatedCount, P2 } from '@/components';

type Props = {
  value: number;
  label: string;
};

export default function Counter({ value, label }: Props) {
  const { colors } = useTheme();

  return (
    <Flex direction="column" gap={{ xs: 6, md: 12, lg: 24 }} align="center">
      <AnimatedCount id={label} prefix="+" value={value} />
      <P2 text={label} color={colors.shades[100]} capitalizeFirstLetter />
    </Flex>
  );
}
