import { useTheme } from '@emotion/react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { Container, Flex, Icon, Link, Logo, SocialBar, P3 } from '@/components';
import { useBreakpoints } from '@/hooks';

import SitMap from './SitMap';
import Wrapper from './styles';

export default function Footer({ small }: { small?: boolean }) {
  const { colors } = useTheme();
  const { t } = useTranslation('app');

  const { medium } = useBreakpoints();

  return (
    <Wrapper
      pv="32px"
      as="footer"
      align="center"
      justify="center"
      gap={{ xs: 10, md: 20, lg: 40 }}
      fullWidth
    >
      <Container width="extraWide">
        {!small && (
          <Flex gap={{ xs: 42, md: 80 }} fullWidth>
            <Logo color="white" size={120} />
            <SitMap />
          </Flex>
        )}
        <Flex
          mt={small ? '20px' : '40px'}
          pt={small ? '0px' : '40px'}
          gap={{ xs: 16, md: 20, lg: 40 }}
          justify="space-between"
          align="center"
          className={small ? '' : 'footer--lower'}
          fullWidth
          direction={{ xs: 'column', md: 'row' }}
        >
          <P3 color={colors.shades[100]}>
            {t('copyrights', {
              year: moment().year(),
            })}
          </P3>
          <Link
            relative={false}
            to="https://eauthenticate.saudibusiness.gov.sa/certificate-details/0000023559"
          >
            <Icon size={medium ? 180 : 150} name="sbc" />
          </Link>
          <Flex direction="column" align="center" gap="12px">
            <SocialBar />
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  );
}
