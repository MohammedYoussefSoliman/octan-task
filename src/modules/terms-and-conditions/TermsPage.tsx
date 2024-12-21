import React from 'react';

import { LoadingLogo } from '@/assets/lotties';
import { Paper, Container, NoDataCard, HTML } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import { useAppDispatch, useAxiosInstance } from '@/hooks';
import { changeHeaderVariant, showError } from '@/state';

import Wrapper from './styles';

type RecordsType = {
  body: string;
} | null;

export default function TermsAndConditions() {
  const { get } = useAxiosInstance();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [termsRecords, setTermsRecords] = React.useState<RecordsType>(null);
  const getTerms = React.useCallback(async () => {
    try {
      const {
        data: { records },
      } = await get('terms-conditions');
      setTermsRecords(records as RecordsType);
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, get]);

  React.useEffect(() => {
    getTerms();
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

  if (!termsRecords)
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
          <HTML content={termsRecords.body} />
        </Paper>
      </Container>
    </Wrapper>
  );
}
