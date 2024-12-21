import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { Counter, Figure, Flex, Checkbox, P1, P2 } from '@/components';
import { useAppSelector } from '@/hooks';

import { ItemCard } from '../../styles';

import { PackageItem } from './itemsStep.types';
import ItemStatus from './ItemStatus';
import SelectReason from './SelectReason';

type ItemProps = {
  item: PackageItem;
  field: Record<'id', string>;
  className?: string;
  changeHandler?: (checked: boolean) => void;
};

export default function Item({
  item,
  field,
  changeHandler,
  className,
}: ItemProps) {
  const { order, refundReasons } = useAppSelector(
    (state) => state.consumerOrder,
  );

  const { setValue, control, getValues } = useFormContext();
  const {
    pallet,
    colors,
    branding: { primaryColor },
  } = useTheme();

  const { details: itemInfo } = item;

  return (
    <ItemCard
      disabled={!itemInfo?.refundable}
      direction="column"
      className={className}
      fullWidth
    >
      <Flex
        gap={{ xs: 6, md: 12, lg: 24 }}
        p={{ xs: 6, md: 10, lg: 20 }}
        align="center"
        justify="space-between"
        fullWidth
      >
        <Checkbox
          name={`items[${item.fieldIndex}].checked`}
          control={control}
          defaultChecked={(field as any).checked}
          disabled={!itemInfo?.refundable}
          changeHandler={(event) => {
            if (changeHandler) changeHandler(event.target.checked);
          }}
          fillColor={primaryColor}
        />
        <ItemStatus canBeRefunded={itemInfo.refundable} />
      </Flex>
      <Flex
        className="item--details"
        direction={{
          xs: 'column',
          md: 'row',
        }}
        ph={{ xs: 6, md: 10, lg: 20 }}
        gap={{ xs: 6, md: 12, lg: 24 }}
        align="center"
        justify="space-between"
        fullWidth
      >
        <Flex gap={{ xs: 6, md: 10, lg: 36 }} align="center">
          <Figure url={itemInfo?.image?.url} alt={itemInfo.title} withPadding />
          <Flex direction="column" gap="8px">
            <P1
              text={itemInfo.title}
              weight={500}
              color={pallet.text.heading}
              capitalizeFirstLetter
            />
            <P2
              text={`${itemInfo.final_price} ${order?.currency}`}
              color={colors.grey[400]}
              capitalizeFirstLetter
            />
          </Flex>
        </Flex>
        <Flex gap={{ xs: 6, md: 8, lg: 16 }} align="center">
          <P1
            text="quantity"
            weight={500}
            color={pallet.text.heading}
            capitalizeFirstLetter
          />
          <Counter
            controlValue={itemInfo.quantity}
            value={
              getValues(`items[${item.fieldIndex}].quantity`) ||
              itemInfo.quantity
            }
            disabled={
              !itemInfo?.refundable
                ? true
                : itemInfo.quantity > 1
                  ? false
                  : itemInfo.quantity <= 1
            }
            minValue={1}
            onChange={(count) =>
              setValue(`items[${item.fieldIndex}].quantity`, count)
            }
          />
        </Flex>
      </Flex>
      <Flex fullWidth p={{ xs: 6, md: 10, lg: 20 }}>
        <SelectReason
          index={item.fieldIndex}
          refundReasons={refundReasons}
          disabled={!itemInfo?.refundable}
          onChange={(val) => {
            if (val) {
              setValue(`items[${item.fieldIndex}].checked`, true);
              if (changeHandler) changeHandler(true);
            }
          }}
        />
      </Flex>
    </ItemCard>
  );
}
