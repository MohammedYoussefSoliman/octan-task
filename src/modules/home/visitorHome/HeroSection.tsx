import { useTheme } from '@emotion/react';

import { Flex, H1, P2, Logo, RefundForm } from '@/components';

import { RefundFormContainer, WelcomeSticker } from '../styles';

type Props = {
  title: string;
  welcomeStatus: string;
};

function HeroSection({ title, welcomeStatus }: Props) {
  const { colors, pallet } = useTheme();

  return (
    <Flex
      mt={{ xs: 16, md: 24 }}
      direction="column"
      fullWidth
      gap={{ xs: 12, md: 32, lg: 91 }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={{ xs: 7, md: 15, lg: 30 }}
        fullWidth
      >
        <WelcomeSticker align="center" gap={{ xs: 6, md: 10 }}>
          <Logo color="white" size={24} logoIcon />
          <P2
            text={welcomeStatus}
            color={pallet.text.heading}
            capitalizeFirstLetter
          />
        </WelcomeSticker>
        <H1 text={title} color={colors.shades[100]} textAlign="center" />
      </Flex>
      <RefundFormContainer
        width={{ xs: '100%', md: '50%', lg: '40%' }}
        m="auto"
      >
        <RefundForm />
      </RefundFormContainer>
    </Flex>
  );
}

export default HeroSection;
