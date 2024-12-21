import { useTheme } from '@emotion/react';

import { Flex, P2 } from '@/components';

import { HowToCard } from '../styles';

type Props = {
  image: string;
  caption: string;
};

export default function HowStep({ image, caption }: Props) {
  const { pallet } = useTheme();

  return (
    <Flex
      direction="column"
      gap={{ xs: 7, md: 15, lg: 30 }}
      align="center"
      key={caption}
    >
      <HowToCard>
        <img className="image" src={image} alt="HOW_IMG1" />
      </HowToCard>
      <Flex justify="center" fullWidth>
        <Flex justify="center" maxWidth={200}>
          <P2
            text={caption}
            textAlign="center"
            color={pallet.text.heading}
            weight={500}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
