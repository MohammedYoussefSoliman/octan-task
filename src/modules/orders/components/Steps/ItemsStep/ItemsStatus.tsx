import { useTheme } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { Flex, P3 } from '@/components';

export default function ItemsStatus() {
  const { colors, pallet } = useTheme();
  const items = useWatch({ name: 'items' });

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={{ xs: 7, md: 15, lg: 30 }}
      fullWidth
    >
      <P3
        text="selectItemToRefund"
        weight={600}
        color={pallet.text.heading}
        capitalizeFirstLetter
      />
      <Flex gap={4}>
        <P3
          text={`${(items as any[]).filter((item) => item.checked).length}`}
          weight={500}
          color={colors.grey[400]}
        />
        <P3
          text="selectedItem"
          capitalizeFirstLetter
          weight={500}
          color={colors.grey[400]}
        />
      </Flex>
    </Flex>
  );
}
