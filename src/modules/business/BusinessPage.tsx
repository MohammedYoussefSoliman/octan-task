import React from 'react';

import { useTheme } from '@emotion/react';

import { LoadingLogo } from '@/assets/lotties';
import { Container, Flex, Icon, Button, NoDataCard, P2 } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import {
  useAppDispatch,
  useAxiosInstance,
  useAppSelector,
  useBreakpoints,
} from '@/hooks';
import { showError } from '@/state';
import { changeHeaderVariant } from '@/state';

import Advantages from './components/Advantages';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import RevenueCalculator from './components/RevenueCalculator';
import TheFigure from './components/TheFigure';
import Wrapper, { Banner } from './style';
import { RecordsType } from './types';

export default function BusinessPage() {
  const { pallet } = useTheme();
  const { medium } = useBreakpoints();
  const { language } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { get } = useAxiosInstance(language);
  const [businessRecords, setBusinessRecords] =
    React.useState<RecordsType>(null);

  const getRecords = React.useCallback(async () => {
    try {
      const {
        data: { records },
      } = await get('customer/business', {
        headers: {
          language,
        },
      });
      setBusinessRecords(records as RecordsType);
      setLoading(false);
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    }
  }, [dispatch, language, get]);

  React.useEffect(() => {
    // adjust the header for this module
    dispatch(changeHeaderVariant('transparent'));
  }, [dispatch]);

  React.useEffect(() => {
    scrollToTop(0);
  }, []);

  React.useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  if (loading)
    return (
      <Wrapper>
        <Flex
          pt="80px"
          className="hero--section"
          align="center"
          justify="center"
        >
          <LoadingLogo speed={0.5} />
        </Flex>
      </Wrapper>
    );

  if (!businessRecords)
    return (
      <Wrapper>
        <Flex className="hero--section" align="center" justify="center">
          <Container>
            <NoDataCard text="noDataFound" />
          </Container>
        </Flex>
      </Wrapper>
    );

  return (
    <Wrapper direction="column">
      <Flex className="hero--section" align="center">
        <Container>
          <HeroSection
            title={businessRecords.title}
            description={businessRecords.description}
            trustedBy={businessRecords.trustedBy}
          />
          <RevenueCalculator />
        </Container>
      </Flex>

      <Container>
        <TheFigure theFigure={businessRecords.theFigure} />
        <HowItWorks howItWorks={businessRecords.howItWorks} />
      </Container>
      <Flex
        pv={{ xs: 32, md: 40, lg: 60, xl: 80 }}
        direction="column"
        gap={{ xs: 32, md: 42 }}
        align="center"
        justify="center"
        className="white--section"
        fullWidth
      >
        <Banner justify="center" align="center">
          <img src={businessRecords.banner} alt={businessRecords.banner} />
        </Banner>
        <Container>
          <Advantages
            records={businessRecords.advantages.records}
            title={businessRecords.advantages.title}
          />

          <Flex
            fullWidth
            align="center"
            justify="center"
            mt={{ xs: 70, md: 100 }}
          >
            <Button
              onClick={() => {
                scrollToTop();
              }}
              fullWidth={!medium}
            >
              <Flex fullWidth align="center" gap={{ xs: 15 }} justify="center">
                <P2 text="applyNow" color={pallet.text.white} />
                <Icon
                  name={`arrow-${language === 'en' ? 'right' : 'left'}`}
                  color={pallet.text.white}
                />
              </Flex>
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Wrapper>
  );
}
