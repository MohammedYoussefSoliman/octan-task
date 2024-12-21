import { Flex } from '@/components/Grids';

import ExpandButton from './ExpandButton';

type Props = {
  expanded: boolean;
  toggleExpanded: () => void;
  itemsCount: number;
};

export default function RefundOrderCardRight({
  expanded,
  toggleExpanded,
  itemsCount,
}: Props) {
  return (
    <Flex align="center" gap={{ xs: 6, md: 8, lg: 16 }}>
      <ExpandButton
        expanded={expanded}
        toggleExpanded={toggleExpanded}
        count={itemsCount}
      />
    </Flex>
  );
}
