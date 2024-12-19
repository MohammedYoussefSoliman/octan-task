import React from 'react';

import { Flex, HTML, Spinner } from '@/components';
import { useAxiosInstance, useAppDispatch } from '@/hooks';
import { showError } from '@/state/ui-actions/slice';

export default function TermsAndConditions() {
  const { get } = useAxiosInstance();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [agreement, setAgreement] = React.useState<null | string>(null);
  const getTerms = React.useCallback(async () => {
    try {
      const { data } = await get('agreement');
      setAgreement(data[0].agreement);
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

  if (loading)
    return (
      <Flex align="center" justify="center" p={50} fullWidth>
        <Spinner size={50} />
      </Flex>
    );
  return (
    <Flex p={{ xs: 10, sm: 16, md: 24, lg: 40 }} fullWidth>
      {agreement && <HTML content={agreement} />}
    </Flex>
  );
}
