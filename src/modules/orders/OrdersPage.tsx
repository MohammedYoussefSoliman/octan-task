import React from 'react';

import { debounce } from 'lodash';

import {
  Container,
  Flex,
  PaginationController,
  NoDataCard,
  Spinner,
  OrdersFilter,
} from '@/components';
import { FilterStateType } from '@/components/OrdersFilter/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getOrders } from '@/state/order/getRefundOrders';
import { changeHeaderVariant } from '@/state/ui/slice';

import OrdersHeading from './components/OrdersHeading';
import RefundOrders from './components/RefundOrders';
import Wrapper from './styles';

const items = [
  { label: 'inProgress', value: 'inProgress' },
  { label: 'completed', value: 'complete' },
];

export default React.memo(function OrdersList() {
  const dispatch = useAppDispatch();
  const {
    consumerOrder: {
      refundOrders: { orders, meta },
    },
    consumerAuth: { nafathVerificationStatus },
  } = useAppSelector((state) => state);
  const [page, setPage] = React.useState<number>(meta?.current_page || 1);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [filterState, setFilterState] = React.useState<FilterStateType>({
    search: '',
    status: 'inProgress',
  });

  const updatedResponse = orders.map((order: any) => ({
    ...order,
    id: order.yamm_id,
  }));

  let content;

  const handleFilterChange = React.useCallback(
    (state: FilterStateType) => {
      setFilterState(state);
      setPage(1);
    },
    [setFilterState],
  );
  const sendFilterData = React.useCallback(
    (state: FilterStateType) => {
      dispatch(
        getOrders({
          config: {
            params: {
              ...state,
              page,
              perPage: 4,
            },
          },
          onEnd() {
            setLoading(false);
          },
        }),
      );
    },
    [dispatch, page],
  );

  const debouncedFilterChange = debounce(handleFilterChange, 500);

  React.useEffect(() => {
    if (nafathVerificationStatus !== 'required') {
      sendFilterData(filterState);
    }
  }, [filterState, nafathVerificationStatus, sendFilterData]);

  React.useEffect(() => {
    // adjust the header for this module
    dispatch(changeHeaderVariant('white'));
  }, [dispatch]);

  if (nafathVerificationStatus === 'required') return null;

  if (loading)
    content = (
      <Flex fullWidth align="center" justify="center" p={48}>
        <Spinner size={50} />
      </Flex>
    );
  else if (!orders.length)
    content = (
      <Flex fullWidth align="center" justify="center" height="60vh">
        <NoDataCard text="youHaveNoOrders" />
      </Flex>
    );
  else
    content = (
      <Flex
        direction="column"
        justify="space-between"
        gap={{ xs: 30 }}
        fullWidth
      >
        <RefundOrders orders={updatedResponse} />
        {meta && meta.last_page > 1 && (
          <Flex justify={{ xs: 'center', md: 'flex-end' }} fullWidth>
            <PaginationController
              pagesLength={meta.last_page}
              activePage={page}
              handleNext={() => setPage((prevPage) => prevPage + 1)}
              handlePrev={() => setPage((prevPage) => prevPage - 1)}
              dotClick={(value) => setPage(value)}
            />
          </Flex>
        )}
      </Flex>
    );

  return (
    <Wrapper direction="column">
      <Flex className="orders--page">
        <Container>
          <OrdersHeading />
          <Flex
            direction="column"
            mt={{ xs: 30, md: 58 }}
            gap={{ xs: 30 }}
            fullWidth
          >
            <OrdersFilter onChange={debouncedFilterChange} radioItems={items} />
            {content}
          </Flex>
        </Container>
      </Flex>
    </Wrapper>
  );
});
