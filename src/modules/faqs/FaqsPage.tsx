import React from 'react';

import { LoadingLogo } from '@/assets/lotties';
import { Container, Flex, NoDataCard, H4 } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import { useAppDispatch, useAxiosInstance } from '@/hooks';
import { changeHeaderVariant } from '@/state/ui/slice';
import { showError } from '@/state/ui-actions/slice';

import FaqAccordion from './FaqAccordion';
import Wrapper from './styles';
import { RecordsType } from './types';

export default function Faqs() {
  const { get } = useAxiosInstance();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [faqsRecords, setFaqsRecords] = React.useState<RecordsType>(null);

  const getFaqs = React.useCallback(async () => {
    try {
      const {
        data: { records },
      } = await get('FAQ');
      setFaqsRecords(records as RecordsType);
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, get]);

  React.useEffect(() => {
    getFaqs();
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
        <Flex pt="80px" align="center" justify="center" fullWidth>
          <LoadingLogo speed={0.5} />
        </Flex>
      </Wrapper>
    );

  if (!faqsRecords) {
    return (
      <Wrapper>
        <Flex
          pt="80px"
          className="hero--section"
          align="center"
          justify="center"
          fullWidth
        >
          <NoDataCard text="noDataFound" />
        </Flex>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Flex pb="80px" pt="58px" direction="column" gap={{ xs: 19 }} fullWidth>
          <H4 text="faqs" />
          <Flex align="center" direction="column" gap={{ xs: 16 }} fullWidth>
            {faqsRecords.map((record) => {
              return record.FAQs.map((faq) => {
                return (
                  <FaqAccordion
                    key={`rec-${record.id}_faq-${faq.id}`}
                    question={faq.question}
                    answer={faq.answer}
                  />
                );
              });
            })}
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  );
}
