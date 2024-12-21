import React from 'react';

import { useParams } from 'react-router-dom';

import { RefundForm, Flex, InvalidStore } from '@/components';

import Wrapper from './styles';

export default function StoreById() {
  const { storeId } = useParams();
  const [isValidStore, setIsValidStore] = React.useState<boolean>(true);

  return (
    <Wrapper direction="column">
      <Flex
        p={{ xs: '12px 12px 24px', md: '12px 12px 30px' }}
        className="hero--section"
        align="center"
        justify="center"
      >
        {!isValidStore ? (
          <InvalidStore />
        ) : (
          <RefundForm
            storeIdParam={storeId}
            handleInvalidStoreId={() => {
              setIsValidStore(false);
            }}
            isSelectStoreDisabled
            className="store-refund"
          />
        )}
      </Flex>
    </Wrapper>
  );
}
