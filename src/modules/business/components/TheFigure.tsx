import { useTheme } from '@emotion/react';

import { Flex } from '@/components/Grids';
import { H1, P1, H2 } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';

import { TheFigurePaper } from '../style';
import { TheFigureType } from '../types';

type Props = {
  theFigure: TheFigureType;
};

export default function TheFigure({ theFigure }: Props) {
  const { pallet } = useTheme();
  const { medium } = useBreakpoints();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      fullWidth
      pv={{ xs: 50, md: 100 }}
      gap={{ xs: 24, md: 32 }}
    >
      <H2 text={theFigure.title} />
      <Flex
        justify="space-between"
        direction={medium ? 'row' : 'column'}
        align="center"
        gap={{ xs: 16, md: 20 }}
        fullWidth
      >
        {theFigure.items.map((item) => {
          return (
            <TheFigurePaper
              key={item.value}
              direction="column"
              gap={{ xs: 12, md: 31 }}
              align="center"
            >
              <H1 text={item.value} color={pallet.primary[500]} />
              <Flex
                className="item-description"
                align="center"
                justify="center"
              >
                <P1 text={item.description} textAlign="center" />
              </Flex>
            </TheFigurePaper>
          );
        })}
      </Flex>
    </Flex>
  );
}
