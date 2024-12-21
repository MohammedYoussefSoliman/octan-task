import React from 'react';

import { useTheme } from '@emotion/react';
import _ from 'lodash';
import loGet from 'lodash/get';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import {
  Badge,
  Card,
  Container,
  Flex,
  ItemInfo,
  GoBack,
  Link,
  NoDataCard,
  Picture,
  Spinner,
  StatusStepper,
  H6,
  P2,
} from '@/components';
import { localizedDateFormatter } from '@/helpers/functions';
import { Order, RefundStatus } from '@/helpers/types';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { changeHeaderVariant } from '@/state/ui/slice';
import { showError } from '@/state/ui-actions/slice';

import AddMoreImagesForm from './components/AddMoreImagesForm';
import GalleryButton from './components/GalleryButton';
import OrderItemStatus from './components/OrderItemStatus/OrderItemStatus';
import RejectedStatus from './components/OrderItemStatus/RejectedStatus';
import StatusDescription from './components/OrderItemStatus/StatusDescription';
import { InfoWrapper, ItemWrapper } from './styles';

const resolveOverdue = (variant: string | { name: string; icon: string }) => {
  if (typeof variant === 'object' && variant.name === 'overdue')
    return 'overdueShipping';
  return '';
};

export default function OrderPage() {
  const dispatch = useAppDispatch();
  const { pallet } = useTheme();
  const [currentStatus, setCurrentStatus] = React.useState<RefundStatus | null>(
    null,
  );

  const params = useParams();
  const {
    ui: { language },
    consumerAuth: { nafathVerificationStatus },
  } = useAppSelector((state) => state);
  const { get } = useAxiosInstance(language);

  const getOrderData = React.useCallback(async () => {
    try {
      const {
        data: { records: orderData },
      } = await get(`customer/orders/${params.orderId}`, {
        headers: {
          language,
        },
      });
      const storedOrderStatus = (orderData.status_log as RefundStatus[]).find(
        (refOrder) => refOrder.isCurrent,
      );
      if (storedOrderStatus) {
        setCurrentStatus(storedOrderStatus);
      }
      return orderData;
    } catch (error) {
      if ((error as any).response?.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
      return error;
    }
  }, [dispatch, get, language, params.orderId]);

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ['order', params.orderId],
    queryFn: getOrderData,
    enabled: !!params.orderId,
    refetchOnWindowFocus: false,
  });

  const notShiplessStoreJourney =
    loGet(order, 'store.store_journey') !== 'shipless';

  React.useEffect(() => {
    dispatch(changeHeaderVariant('white'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (nafathVerificationStatus === 'required') return null;

  if (isLoading)
    return (
      <Flex fullWidth align="center" justify="center" p={48}>
        <Spinner size={50} />
      </Flex>
    );

  if (!order)
    return (
      <Flex fullWidth align="center" justify="center" height="60vh">
        <NoDataCard text="thisOrderDoesNotExists" />
      </Flex>
    );

  return (
    <Flex mv="2rem" fullWidth>
      <Container>
        <Flex direction="column" gap="32px" fullWidth>
          <GoBack />
          <Card
            heading={
              <Flex direction="column">
                <H6 text="orderDetails" />
                <Flex align="center" gap="8px">
                  <P2 text="orderNumber" endAdornment=":" />
                  <H6 text={order.order_number} />
                </Flex>
              </Flex>
            }
          >
            <>
              <Flex
                align="center"
                justify="center"
                mb={{ xs: 20, md: 42 }}
                fullWidth
              >
                {order.status_log && (
                  <StatusStepper orderStatuses={order.status_log} />
                )}
              </Flex>
              {currentStatus && (
                <StatusDescription
                  state={_.get(
                    currentStatus,
                    'variant.state',
                    currentStatus.state,
                  )}
                  description={_.get(
                    currentStatus,
                    'variant.statusDescription',
                    currentStatus.statusDescription,
                  )}
                />
              )}
              {currentStatus?.name === 'waiting-shipping' &&
                currentStatus?.variant && (
                  <RejectedStatus
                    reason={resolveOverdue(currentStatus?.variant)}
                  />
                )}
              {order.items.map((item, index) => (
                <ItemWrapper
                  className={`${
                    order.items.length === index + 1 ? 'borderless' : ''
                  }`}
                  direction={{ xs: 'column', sm: 'row' }}
                  gap="32px"
                  key={item.id}
                  fullWidth
                  pb={
                    order.items.length < index + 1
                      ? { xs: 16, md: 24 }
                      : undefined
                  }
                >
                  <Picture url={item.images[0]?.url} alt={item.name} />
                  <Flex
                    direction="column"
                    gap={{ xs: 10, md: 16, lg: 32 }}
                    flex={1}
                  >
                    <Flex
                      direction="column"
                      gap={{ xs: 10, md: 16, lg: 32 }}
                      fullWidth
                    >
                      <P2
                        text="itemInfo"
                        weight={500}
                        color={pallet.text.heading}
                        capitalizeFirstLetter
                      />
                      <Flex
                        gap={{ xs: 10, md: 16, lg: 32 }}
                        direction={{ xs: 'column', lg: 'row' }}
                        justify={{ xs: 'flex-start', lg: 'space-between' }}
                        fullWidth
                      >
                        <Flex direction="column" gap="16px" flex={1}>
                          <ItemInfo label="itemName">
                            <P2 text={item.name} color={pallet.text.heading} />
                          </ItemInfo>
                          <ItemInfo label="itemPrice">
                            <P2
                              text={`${item.price} SAR`}
                              color={pallet.text.heading}
                            />
                          </ItemInfo>

                          <Flex
                            pb={{ xs: 15, md: 20 }}
                            direction="column"
                            gap={{ xs: 7, md: 12, lg: 20 }}
                            fullWidth
                          >
                            {item.return_status && (
                              <>
                                <ItemInfo label="itemStatus">
                                  <Badge status={item.return_status} />
                                </ItemInfo>
                                {item.return_status === 'rejected' && (
                                  <>
                                    <OrderItemStatus
                                      statusInfo={{
                                        status: item.return_status,
                                        feedback: item.reject_reason,
                                      }}
                                    />
                                    {item.reject_attached.length > 0 && (
                                      <Link
                                        to={
                                          item.reject_attached[0].original_url
                                        }
                                        relative={false}
                                      >
                                        <Picture
                                          url={
                                            item.reject_attached[0].original_url
                                          }
                                          alt={item.reject_reason || ''}
                                        />
                                      </Link>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </Flex>
                        </Flex>
                        <Flex direction="column" gap="16px" flex={1}>
                          <ItemInfo label="returnReason">
                            <P2
                              text={item?.return_reason?.name || ''}
                              color={pallet.text.heading}
                            />
                          </ItemInfo>
                          <ItemInfo label="quantity">
                            <P2
                              text={`${item.quantity}`}
                              color={pallet.text.heading}
                            />
                          </ItemInfo>
                          <Flex gap="16px" mb="16px" align="center" fullWidth>
                            {loGet(item, 'return_reason.attachments', [])
                              .length > 0 ? (
                              <Flex direction="column" gap="8px">
                                <ItemInfo label="attachments">
                                  <GalleryButton
                                    attachments={loGet(
                                      item,
                                      'return_reason.attachments',
                                      [],
                                    ).map((attachment: any) => ({
                                      attachment: attachment.original_url,
                                      type: attachment.type,
                                    }))}
                                  />
                                </ItemInfo>
                              </Flex>
                            ) : null}
                            {order.status === 'submitted' && (
                              <AddMoreImagesForm
                                itemIndex={index}
                                name={`items[${index}]`}
                                itemId={item.id}
                                orderNumber={order.order_number}
                                storeId={order.store_id}
                              />
                            )}
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </ItemWrapper>
              ))}
              <InfoWrapper
                gap={{ xs: 10, md: 16, lg: 32 }}
                direction={{ xs: 'column', lg: 'row' }}
                p={{ xs: 16, md: 24 }}
                fullWidth
              >
                <Flex direction="column" gap="16px" flex={1}>
                  {order.shipment && notShiplessStoreJourney && (
                    <ItemInfo label="shippingCompany">
                      <Flex align="center" gap={{ xs: 6, md: 9, lg: 12 }}>
                        <Flex
                          className="shipping--logo"
                          align="center"
                          justify="center"
                        >
                          <img
                            className="shipping--logo__image"
                            src={order.shipment.company_logo}
                            alt="item_image"
                          />
                        </Flex>
                        <P2
                          text={order.shipment.company_name}
                          color={pallet.text.heading}
                        />
                      </Flex>
                    </ItemInfo>
                  )}
                  <ItemInfo label="submittedDate">
                    <P2
                      text={localizedDateFormatter(order.submission_date, {
                        localCode: language,
                      })}
                      color={pallet.text.heading}
                    />
                  </ItemInfo>
                  {order.shipment && notShiplessStoreJourney && (
                    <>
                      <ItemInfo label="shipmentDetails">
                        {order.shipment.policy_url ? (
                          <Link to={order.shipment.policy_url} relative={false}>
                            <P2
                              text="shipmentDownload"
                              color={pallet.primary[600]}
                              hover={{
                                decoration: 'underline',
                              }}
                            />
                          </Link>
                        ) : (
                          <P2 text="shipmentSoon" color={pallet.text.heading} />
                        )}
                      </ItemInfo>
                      <ItemInfo label="shipmentNumber">
                        <P2
                          text={order.shipment.shipment_number || ''}
                          color={pallet.text.heading}
                        />
                      </ItemInfo>
                    </>
                  )}
                </Flex>
                <Flex direction="column" gap="16px" flex={1}>
                  {order.shipment &&
                    order.shipment.customer_address &&
                    notShiplessStoreJourney && (
                      <ItemInfo label="shippingAddress">
                        <P2
                          text={order.shipment.customer_address.address_line}
                          color={pallet.text.heading}
                        />
                      </ItemInfo>
                    )}
                  <ItemInfo
                    label="refundPrice"
                    helper={
                      notShiplessStoreJourney
                        ? 'totalRefundAmountMinusShippingFees'
                        : undefined
                    }
                  >
                    <P2
                      text={`${order.final_amount} SAR`}
                      color={pallet.primary[500]}
                      weight={500}
                    />
                  </ItemInfo>
                </Flex>
              </InfoWrapper>
            </>
          </Card>
        </Flex>
      </Container>
    </Flex>
  );
}
