import { useTheme } from '@emotion/react';

import { Flex, H4, P3 } from '@/components';
import { useBreakpoints } from '@/hooks';

import HowStep from './HowStep';
import { HowItWorksType, HowItWorksTitleType } from './types';

type Props = {
  howItWorks: HowItWorksType[];
  howItWorksTitle: HowItWorksTitleType;
};

export default function HowSection({ howItWorks, howItWorksTitle }: Props) {
  const { medium } = useBreakpoints();
  const { pallet } = useTheme();

  return (
    <Flex
      pt="80px"
      pb={{ xs: '200px', md: '400px' }}
      direction="column"
      gap={{ xs: 15, md: 30, lg: 60 }}
      align="center"
      fullWidth
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={{ xs: 10, md: 20 }}
      >
        <H4 text={howItWorksTitle.title} capitalizeFirstLetter />
        <Flex align="center" justify="center" maxWidth={500}>
          <P3
            text={howItWorksTitle.description}
            capitalizeFirstLetter
            textAlign="center"
            color={pallet.text.heading}
          />
        </Flex>
      </Flex>
      <Flex
        gap={{ xs: 10, md: 22, lg: 45 }}
        direction={medium ? 'row' : 'column'}
        align={medium ? 'flex-start' : 'center'}
        justify="space-between"
        fullWidth
        withWrap
      >
        {howItWorks.map((data) => {
          return (
            <HowStep
              key={data.caption}
              caption={data.caption}
              image={data.image}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
