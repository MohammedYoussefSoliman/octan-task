import React from 'react';

import { useFormContext } from 'react-hook-form';

import { CheckOrderForm } from '@/helpers/types';
import { useAppSelector } from '@/hooks';

export const useSelectedItems = () => {
  const { watch } = useFormContext<CheckOrderForm>();
  const { order } = useAppSelector((state) => state.consumerOrder);

  const { items } = watch();

  const checkedFields = items.filter((f) => f.checked);
  const selectedItems = React.useMemo(
    () =>
      checkedFields.map((field) => {
        const foundItem = order?.items.find((item) => {
          if (field.variant_id) {
            return item.variant_id === field.variant_id;
          }
          return item.id === field.id;
        });
        return { ...foundItem, ...field };
      }),
    [checkedFields, order?.items],
  );

  return {
    selectedItems,
  };
};
