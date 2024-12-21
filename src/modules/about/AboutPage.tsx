import React from 'react';

import { LoadingLogo } from '@/assets/lotties';
import { Container, NoDataCard, Paper, P3, H4 } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import { useAppDispatch, useAxiosInstance } from '@/hooks';
import { changeHeaderVariant } from '@/state/ui/slice';
import { showError } from '@/state/ui-actions/slice';

import Wrapper from './styles';

type RecordsType = {
  title: string;
  description: string;
} | null;
export default function About() {
  const { get } = useAxiosInstance();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [aboutRecords, setAboutRecords] = React.useState<RecordsType>(null);
  const getAbout = React.useCallback(async () => {
    try {
      const {
        data: { records },
      } = await get('customer/about');
      setAboutRecords(records as RecordsType);
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, get]);

  React.useEffect(() => {
    getAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // adjust the header for this module
    dispatch(changeHeaderVariant('white'));
  }, [dispatch]);

  React.useEffect(() => {
    scrollToTop(0);
  }, []);

  if (loading)
    return (
      <Wrapper>
        <Container>
          <Paper
            p={{ xs: 16, md: 32, lg: 42 }}
            gap={{ xs: 8, md: 16, lg: 32 }}
            direction="column"
            mv={24}
            fullWidth
            align="center"
          >
            <LoadingLogo speed={0.5} />
          </Paper>
        </Container>
      </Wrapper>
    );

  if (!aboutRecords)
    return (
      <Wrapper>
        <Container>
          <Paper
            p={{ xs: 16, md: 32, lg: 42 }}
            gap={{ xs: 8, md: 16, lg: 32 }}
            direction="column"
            mv={24}
            fullWidth
          >
            <NoDataCard text="noDataFound" />
          </Paper>
        </Container>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Container>
        <Paper
          p={{ xs: 16, md: 32, lg: 42 }}
          gap={{ xs: 8, md: 16, lg: 32 }}
          direction="column"
          mv={24}
          fullWidth
        >
          <H4 text={aboutRecords.title} />
          <P3 text={aboutRecords.description} />
        </Paper>
      </Container>
    </Wrapper>
  );
}
