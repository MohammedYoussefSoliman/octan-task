import { useTheme } from '@emotion/react';

import { Container, Flex, Button, Icon, H3, H6, P2, Paper } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import { useAppSelector, useBreakpoints } from '@/hooks';

import { BannerType } from './types';

type Props = BannerType;

export default function TutorSection({
  buttonLabel,
  description,
  image,
  title,
}: Props) {
  const { colors } = useTheme();
  const { large } = useBreakpoints();
  const {
    ui: { language },
  } = useAppSelector((state) => state);
  return (
    <Container width="fullWidth">
      <Paper
        p={{
          xs: '16px',
          sm: '40px 20px',
          md: '48px 32px',
          xxl: '100px 50px',
        }}
        direction={{ xs: 'column', lg: 'row' }}
        align={{ xs: 'center', lg: 'flex-start' }}
        gap={{ xs: 20, md: 40, lg: 80 }}
        fullWidth
      >
        <Flex flex={1}>
          <img className="instant--img" src={image} alt="instant refund bg" />
        </Flex>
        <Flex direction="column" gap={{ xs: 10, md: 20, lg: 40 }} flex={1}>
          <H3 text={title} />
          <Flex
            mb={{
              xs: '10px',
              md: '20px',
            }}
            maxWidth="75%"
          >
            <P2 text={description} />
          </Flex>
          <Button
            size="lg"
            fullWidth={!large}
            onClick={() => {
              scrollToTop();
            }}
          >
            <Flex align="center" gap={{ xs: 6, md: 12 }}>
              <H6 text={buttonLabel} color={colors.shades[100]} />
              <Icon
                name={`arrow-${language === 'en' ? 'right' : 'left'}`}
                color={colors.shades[100]}
                size={24}
              />
            </Flex>
          </Button>
        </Flex>
      </Paper>
    </Container>
  );
}
