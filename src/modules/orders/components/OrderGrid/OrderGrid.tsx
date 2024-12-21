import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Flex, Divider } from '@/components';
import { P1, P2 } from '@/components/Typography';
import { OrderItemType, RefundReasonsType } from '@/state/types';

import OrderGridWrapper from './style';

type OrdersType = OrderItemType & { reason_id: number };

type Props = {
  orders: OrdersType[];
  checkedFields: any[];
  refundReasons: RefundReasonsType[];
  currency?: string;
};

export default function OrderGrid({
  orders,
  checkedFields,
  currency = '',
  refundReasons,
}: Props) {
  const { pallet, colors } = useTheme();
  const { t } = useTranslation('app');

  return (
    <OrderGridWrapper direction="column" gap={{ xs: 16 }} fullWidth>
      <Flex
        className="grid--header"
        justify="space-between"
        pv="16px"
        ph="16px"
        fullWidth
      >
        <P1
          className="order-property"
          text="product"
          weight={600}
          color={pallet.text.heading}
          capitalizeFirstLetter
        />
        <P1
          className="order-property"
          text="price"
          weight={600}
          color={pallet.text.heading}
          capitalizeFirstLetter
        />
      </Flex>
      {orders.map((order, index) => {
        return (
          <Flex direction="column" fullWidth ph={{ xs: 12 }}>
            <Flex
              gap={{ xs: 16 }}
              mb={{ xs: 16 }}
              direction="row"
              justify="space-between"
              fullWidth
            >
              <Flex gap={{ xs: 8 }}>
                <Flex className="order--img">
                  <img src={order?.image?.url} alt={order.title} />
                </Flex>
                <P1
                  text={order.title}
                  color={pallet.text.heading}
                  capitalizeFirstLetter
                />
              </Flex>
              <P1
                text={`${order.final_price} ${currency}`}
                color={pallet.text.heading}
                capitalizeFirstLetter
              />
            </Flex>
            <Flex direction="column" gap={{ xs: 4 }} mb={{ xs: 16 }}>
              <P2 color={colors.blue[1000]} capitalizeFirstLetter>
                <b> {t('quantity')}: </b>{' '}
                {` ${
                  checkedFields.find((fld) => fld.id === order.id).quantity
                }`}
              </P2>
              <P2 color={colors.blue[1000]} capitalizeFirstLetter>
                <b> {t('reason')}: </b>
                {
                  refundReasons.find((reason) => reason.id === order.reason_id)
                    ?.name
                }
              </P2>
            </Flex>
            {index !== orders.length - 1 && <Divider />}
          </Flex>
        );
      })}
    </OrderGridWrapper>
  );
}
