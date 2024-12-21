import React from 'react';

import { LoadingLogo } from '@/assets/lotties';
import { Container, Flex, NoDataCard } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { showError } from '@/state';

import Wrapper from '../styles';

import HeroSection from './HeroSection';
import OurPartners from './OurPartners';
import TutorSection from './TutorSection';
import { RecordsType } from './types';

export default React.memo(function Home() {
  const { language } = useAppSelector((state) => state.ui);
  const { get } = useAxiosInstance(language);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [homeRecords, setHomeRecorders] = React.useState<RecordsType>(null);
  const getRecords = React.useCallback(async () => {
    try {
      const {
        data: { records },
      } = await get('customer/home', {
        headers: {
          language,
        },
      });

      setHomeRecorders(records as RecordsType);
      setLoading(false);
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    }
  }, [dispatch, get, language]);

  React.useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  React.useEffect(() => {
    scrollToTop();
  }, []);

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

  if (!homeRecords)
    return (
      <Wrapper>
        <Flex
          pt="80px"
          className="hero--section"
          align="center"
          justify="center"
        >
          <Container>
            <NoDataCard text="noDataFound" />
          </Container>
        </Flex>
      </Wrapper>
    );

  return (
    <Wrapper direction="column">
      <Flex pt="80px" className="hero--section" align="center">
        <Container>
          <HeroSection
            title={homeRecords.title}
            welcomeStatus={homeRecords.welcomeStatus}
          />
        </Container>
      </Flex>
      {/* <Flex direction="column" gap={{ xs: 6, md: 8 }} fullWidth> */}
      <OurPartners />
      {/* </Flex> */}
      {/* <Container>
        <HowSection
          howItWorks={homeRecords.howItWorks}
          howItWorksTitle={homeRecords.howItWorksTitle}
        />
      </Container> */}
      <TutorSection banner={homeRecords.banner} steps={homeRecords.steps} />
    </Wrapper>
  );
});
