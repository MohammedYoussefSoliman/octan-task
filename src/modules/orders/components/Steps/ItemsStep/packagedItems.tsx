import React from 'react';

import { useTheme } from '@emotion/react';
import loGet from 'lodash/get';
import {
  Control,
  FieldValues,
  useFormContext,
  UseFormWatch,
} from 'react-hook-form';

import { Flex, Icon, Figure } from '@/components';
import { Checkbox } from '@/components/Inputs';
import { H5, P1 } from '@/components/Typography';

import { PackagePaper } from '../../styles';

import Item from './Item';
import { OrderPackage } from './itemsStep.types';

export type PackagedItemsProps = {
  item: OrderPackage;
  fields: Record<'id', string>[];
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues>;
};

export default function PackagedItems({
  item,
  fields,
  watch,
  control,
}: PackagedItemsProps) {
  const { pallet, colors } = useTheme();
  const { setValue } = useFormContext();

  const watchedItems = watch('items');
  const subItemsIndexes = item.items.map((field) => field.fieldIndex);

  const packageWatchedItems = (watchedItems as any[]).filter((_, index) =>
    subItemsIndexes.includes(index),
  );

  const [packageItems, setPackageItems] =
    React.useState<any[]>(packageWatchedItems);

  const allChecked = packageItems.every((subItem) => subItem.checked);

  const partialChecked =
    packageItems.some((subItem) => subItem.checked) && !allChecked;

  React.useEffect(() => {
    if (allChecked) {
      setValue(`package.${item.id}`, true);
    } else {
      setValue(`package.${item.id}`, false);
    }
  }, [allChecked, item, setValue]);

  return (
    <PackagePaper direction="column" gap="16px" fullWidth>
      <Flex gap="16px" align="center" justify="space-between" fullWidth>
        <Flex gap={{ xs: 6, md: 10, lg: 20 }} align="center">
          <Figure
            url={loGet(item, 'image', null)}
            alt={item.name}
            withPadding
          />
          <Flex direction="column" gap="4px">
            <H5 text={item.name} />
            <P1
              text={`${loGet(item, 'actual_price.amount', '')} ${loGet(
                item,
                'actual_price.currency',
                '',
              )}`}
              weight={500}
              color={pallet.primary[500]}
              capitalizeFirstLetter
            />
          </Flex>
        </Flex>
        <Checkbox
          name={`package.${item.id}`}
          control={control}
          defaultChecked={allChecked}
          indeterminate={partialChecked}
          indeterminateIcon={
            <Icon name="minus" color={colors.shades[100]} size={18} />
          }
          changeHandler={(event: React.ChangeEvent<HTMLInputElement>) => {
            subItemsIndexes.forEach((i) => {
              setValue(`items[${i}].checked`, event.target.checked);
            });
          }}
          disabled={!item?.refundable}
        />
      </Flex>
      {item.items.map((subItem) => {
        const field = fields[subItem.fieldIndex];
        return (
          <Item
            key={field.id}
            className="package-item-wrapper"
            field={field}
            item={subItem}
            changeHandler={(checked) => {
              setPackageItems((prev) => {
                const prevState = [...prev];
                const fieldItem = prevState.find(
                  (_, index) => index === subItem.fieldIndex,
                );
                if (fieldItem) {
                  fieldItem.checked = checked;
                }
                return prevState;
              });
            }}
          />
        );
      })}
    </PackagePaper>
  );
}
