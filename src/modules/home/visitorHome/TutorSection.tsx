import { useTheme } from '@emotion/react';

import { Container, Flex, H2 } from '@/components';

import { Tutor } from '../styles';

import InstantRefundSection from './InstantRefundSection';
import TutorCards from './TutorCards';
import { BannerType, StepsType } from './types';

type Props = {
  banner: BannerType;
  steps: StepsType;
};

export default function TutorSection({ banner, steps }: Props) {
  const { colors } = useTheme();

  return (
    <Tutor direction="column" pt="480px" pb="120px" mt={{ xs: 250 }} fullWidth>
      <Flex
        direction="column"
        align="center"
        gap={{ xs: 25, md: 50, lg: 100 }}
        mt={{ xs: -720 }}
        className="tutor--content"
        fullWidth
      >
        <InstantRefundSection
          title={banner.title}
          image={banner.image}
          description={banner.description}
          buttonLabel={banner.buttonLabel}
        />
        <Flex
          direction="column"
          align="center"
          gap={{
            xs: 20,
            md: 40,
            lg: 80,
          }}
          mt={{ xs: 50, md: 20 }}
          fullWidth
        >
          <H2
            text={steps.title}
            textAlign="center"
            uppercase
            color={colors.shades[100]}
          />
          <Container width="extraWide">
            <TutorCards imageSteps={steps.imageSteps} />
          </Container>
        </Flex>
      </Flex>
    </Tutor>
  );
}
