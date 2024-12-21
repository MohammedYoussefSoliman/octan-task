import { useTheme } from '@emotion/react';

import { Flex } from '@/components';
import { H5, H6 } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';

import { HowItWorksItem } from '../style';
import { HowItWorksType } from '../types';

type Props = {
  howItWorks: HowItWorksType[];
};

const isEvenNumber = (num: number) => num % 2 === 0;

export default function HowItWorks({ howItWorks }: Props) {
  const { colors, pallet } = useTheme();
  const { medium } = useBreakpoints();

  return (
    <Flex
      direction="column"
      justify="center"
      fullWidth
      gap={{ xs: 16, md: 32 }}
      pb={100}
    >
      {howItWorks.map((item, index) => {
        return (
          <HowItWorksItem
            key={item.image}
            direction={
              medium ? (isEvenNumber(index) ? 'row' : 'row-reverse') : 'column'
            }
            fullWidth
            align="center"
            justify="space-between"
            gap={{ xs: 16, md: 32 }}
          >
            <div className="card">
              <img className="image" src={item.image} alt="HOW_IMG1" />
            </div>
            <Flex
              className="caption-container"
              direction="column"
              justify="center"
              fullWidth
              gap={{ xs: 12, md: 24 }}
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="sequence"
              >
                <H6 text={index + 1} color={pallet.text.white} />
              </Flex>
              <H5 text={item.caption} color={colors.blue[1000]} weight={700} />
            </Flex>
          </HowItWorksItem>
        );
      })}
    </Flex>
  );
}
