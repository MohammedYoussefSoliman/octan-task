import { useTheme } from '@emotion/react';

import {
  Flex,
  P2,
  P3,
  Picture,
  ItemInfo,
  Badge,
  Link,
  Icon,
} from '@/components';
import { Order } from '@/helpers/types';
import { useAppSelector } from '@/hooks';

import OrderItemStatus from '../../../OrderItemStatus/OrderItemStatus';

import { CardDetailsWrapper } from './styles';

type Props = {
  order: Order;
};

export default function CardDetails({ order }: Props) {
  const {
    ui: { language },
  } = useAppSelector((state) => state);
  const { pallet } = useTheme();
  const { items } = order;

  return (
    <CardDetailsWrapper gap="24px" direction="column" fullWidth>
      {items.map((item, index) => (
        <Flex
          className={`item ${items.length === index + 1 ? 'borderless' : ''}`}
          direction={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 10, md: 16, lg: 32 }}
          key={item.id}
          fullWidth
          pb={items.length < index + 1 ? { xs: 16, md: 24 } : undefined}
        >
          <Picture url={item.images[0]?.url} alt={item.name} />
          <Flex
            direction="column"
            gap={{ xs: 10, md: 16, lg: 32 }}
            flex={1}
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
                  <P2 text={`${item.price} SAR`} color={pallet.text.heading} />
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
                        <OrderItemStatus
                          statusInfo={{
                            status: item.return_status,
                            feedback: item.reason_text,
                          }}
                        />
                      )}
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex direction="column" gap="16px" flex={1} fullWidth>
                <ItemInfo label="reason">
                  <P2
                    text={item.return_reason.name || ''}
                    color={pallet.text.heading}
                  />
                </ItemInfo>
                <ItemInfo label="quantity">
                  <P2 text={`${item.quantity}`} color={pallet.text.heading} />
                </ItemInfo>
                <Flex mt="auto" ml="auto">
                  <Link to={`/orders/${order.id}`}>
                    <Flex direction="row" gap="4px" align="center">
                      <P3
                        text="readMore"
                        color={pallet.primary[600]}
                        hover={{ decoration: 'underline' }}
                      />
                      <Icon
                        color={pallet.primary[600]}
                        name={`chevron-${language === 'ar' ? 'left' : 'right'}`}
                      />
                    </Flex>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </CardDetailsWrapper>
  );
}
