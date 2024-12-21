import { useTheme } from '@emotion/react';

import { Flex, P1, H3 } from '@/components';

import { HowToCard } from '../styles';

type Props = {
  image: string;
  caption: string;
  index: number;
};

export default function TutorCardStep({ index, image, caption }: Props) {
  const { colors } = useTheme();

  return (
    <Flex direction="column" align="center">
      <HowToCard>
        <img className="image" src={image} alt="TUTOR_IMG1" />
      </HowToCard>
      <Flex
        mb={{ xs: '16px', md: '24px' }}
        align="center"
        gap={{ xs: 7, md: 15, lg: 30 }}
      >
        <H3
          text="."
          color={colors.yellow[500]}
          startAdornment={`${index + 1}`}
        />
        <div className="order" />
      </Flex>
      <Flex justify="center" fullWidth>
        <P1
          text={caption}
          textAlign="center"
          capitalizeFirstLetter
          color={colors.shades[100]}
          weight={500}
        />
      </Flex>
    </Flex>
  );
}
