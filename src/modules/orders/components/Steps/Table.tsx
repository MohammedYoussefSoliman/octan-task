import { useTheme } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { Figure, Flex, H6, P1 } from '@/components';
import { useBreakpoints } from '@/hooks';
import { useSelectedItems } from '@/modules/orders/hooks';
import { OrderType, RefundReasonsType } from '@/state/types';

import OrderGrid from '../OrderGrid';
import OrderTable from '../OrderTable';
import { TableElement } from '../OrderTable/types';
import { TotalAmountWrapper } from '../styles';

type Props = {
  order: OrderType;
  refundReasons: RefundReasonsType[];
  showTotal?: boolean;
  headless?: boolean;
};

export default function Table({
  order,
  refundReasons,
  showTotal = true,
  headless,
}: Props) {
  const fields = useWatch({ name: 'items' });
  const {
    pallet,
    branding: { primaryColor },
  } = useTheme();
  const { medium } = useBreakpoints();
  const checkedFields = (fields as any[]).filter((f) => f.checked);
  const { selectedItems } = useSelectedItems();

  const totalPrice = selectedItems.reduce((previous, current) => {
    return (
      previous + current.quantity * parseFloat(current.final_price as string)
    );
  }, 0);

  const rows: TableElement[] = medium
    ? selectedItems.map((field) => ({
        productName: {
          value: (
            <Flex align="center" gap={16}>
              <Figure
                url={field?.image?.url}
                alt={field.title || ''}
                withPadding
              />
              <P1
                text={field.title}
                color={pallet.text.heading}
                capitalizeFirstLetter
              />
            </Flex>
          ),
        },
        price: {
          value: (
            <P1
              text={`${field.final_price} ${order?.currency}`}
              color={pallet.text.heading}
              capitalizeFirstLetter
            />
          ),
        },
        quantity: {
          value: (
            <P1
              text={`${
                checkedFields.find((fld) => fld.id === field.id).quantity
              }`}
              color={pallet.text.heading}
              textAlign="center"
              capitalizeFirstLetter
            />
          ),
        },
        reason: {
          value: (
            <P1
              text={`${
                refundReasons.find((reason) => reason.id === field.reason_id)
                  ?.name
              }`}
              color={pallet.text.heading}
              capitalizeFirstLetter
            />
          ),
        },
      }))
    : [];

  if (selectedItems.length <= 0) return null;

  return (
    <>
      {medium && rows.length ? (
        <OrderTable rows={rows} headless={headless} />
      ) : (
        <OrderGrid
          checkedFields={checkedFields}
          orders={selectedItems as any[]}
          currency={order?.currency}
          refundReasons={refundReasons}
        />
      )}

      {showTotal && (
        <TotalAmountWrapper
          fullWidth
          align="center"
          justify="center"
          direction="column"
        >
          <Flex
            gap={{ xs: 6, md: 8, lg: 16 }}
            justify="center"
            align="center"
            withWrap
          >
            <P1
              text="totalRefundAmount"
              endAdornment=":"
              color={pallet.text.heading}
              weight={500}
              capitalizeFirstLetter
            />
            <H6
              text={`${totalPrice.toFixed(2)} ${order.currency}`}
              color={primaryColor}
            />
          </Flex>
        </TotalAmountWrapper>
      )}
    </>
  );
}
