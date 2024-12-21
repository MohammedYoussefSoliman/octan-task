import React from 'react';

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  InvalidStore,
  LoadingScreen,
  StoreRefundCard,
} from '@/components';
import { convertArabicDigitsToEnglish } from '@/helpers/functions';
import { StoreData } from '@/helpers/types';
import URLS from '@/helpers/urls';
import { useAxiosInstance, useGetQuerySearch } from '@/hooks';

import Wrapper from './styles';

export default function Page() {
  const query = useGetQuerySearch();
  const { get } = useAxiosInstance();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!query.hostname) {
      navigate(URLS.home);
    }
  }, [query.hostname, navigate]);

  const phoneNumber = React.useMemo(() => {
    if (!query.phone) return undefined;

    let phone = query.phone?.replace(/\D/g, '') || '';

    if (phone.startsWith('966')) {
      phone = phone.slice(3);
    }

    return convertArabicDigitsToEnglish(phone);
  }, [query]);

  const storeFormData = React.useMemo(() => {
    return {
      order_id: query.orderNumber?.replace(/\D/g, '') || '',
      email: query.email || '',
      phone_number: phoneNumber || '',
    };
  }, [query, phoneNumber]);

  const {
    data: storeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['store-landing-page'],
    queryFn: async (): Promise<StoreData | null> => {
      const {
        data: { records: storeRecords },
      } = await get('store-landing-page', {
        params: { storeAttribute: query.hostname },
      });

      if (!storeRecords || !storeRecords.id) {
        throw new Error('Invalid store');
      }

      const { data: stores } = await get('/stores');
      const store = stores.records.find(
        (record: any) => record.id === storeRecords.id,
      );

      if (!store) {
        throw new Error('Invalid store');
      }

      return {
        storeId: storeRecords.id,
        orderId: query.orderNumber,
        email: query.email,
        storeName: store?.name,
        verificationMethod: store?.verification_method,
        subscriptionMethod: store?.subscription_method,
        storeJourney: store?.store_journey,
        phoneNumber: Number(phoneNumber),
      };
    },
    enabled: !!query.hostname,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <Wrapper direction="column">
      <Flex
        p={{ xs: '12px 12px 24px', md: '12px 12px 30px' }}
        className="hero--section"
        align="center"
        justify="center"
      >
        {isError ? (
          <InvalidStore />
        ) : (
          <StoreRefundCard
            storeData={storeData}
            storeFormData={storeFormData}
          />
        )}
      </Flex>
    </Wrapper>
  );
}
