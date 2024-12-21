import React from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Card, Flex } from '@/components';
import { scrollToTop } from '@/helpers/functions';
import { useAppSelector } from '@/hooks';

import StepHeader from '../../StepHeader';
import StoreAcceptancePolicy from '../../StoreAcceptancePolicy';

import Item from './Item';
import ItemsStatus from './ItemsStatus';
import StepAction from './ItemsStepAction';
import PackagedItems from './packagedItems';
import prepareItems from './prepareItems';

export default function ItemsStep() {
  const { order } = useAppSelector((state) => state.consumerOrder);
  const items = React.useMemo(() => (order ? order.items : []), [order]);
  const { control, watch, setValue } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: 'items',
  });

  React.useEffect(() => {
    scrollToTop(30);
  }, []);

  const orderItems = React.useMemo(
    () =>
      prepareItems(
        items.map((it, index) => ({
          type: 'item',
          fieldIndex: index,
          details: it,
        })),
        [],
      ),

    [items],
  );

  if (!order) return null;
  if (items.length <= 0) return null;

  return (
    <Card heading="orderItems">
      <Flex direction="column" gap={{ xs: 15, md: 30, lg: 60 }} fullWidth>
        {order.store && (
          <>
            <StepHeader
              logo={order.store.logo}
              name={order.store.name}
              orderId={order.order_number}
            />
            <StoreAcceptancePolicy
              agreementUrl={order.store.agreement_url}
              text="acceptanceStatus"
            />
          </>
        )}
        <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} fullWidth>
          <ItemsStatus />
          {orderItems.map((item) => {
            if (item.type === 'package') {
              return (
                <PackagedItems
                  item={item}
                  fields={fields}
                  watch={watch}
                  control={control}
                />
              );
            }
            const field = fields[item.fieldIndex];
            return (
              <Item
                key={field.id}
                field={field}
                item={item}
                changeHandler={(checked: boolean) => {
                  if (checked) {
                    if (item.details.variant_id) {
                      setValue(
                        `items.${item.fieldIndex}.variant_id`,
                        item.details.variant_id,
                      );
                    }
                  }
                }}
              />
            );
          })}
        </Flex>
      </Flex>
      <StepAction />
    </Card>
  );
}
