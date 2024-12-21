import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Flex, SelectInput } from '@/components';
import { RefundReasonsType } from '@/state/types';

type Props = {
  index: number;
  refundReasons: RefundReasonsType[];
  onChange?: (value: number | string) => void;
  disabled?: boolean;
};

export default function SelectReason({
  index,
  refundReasons,
  onChange,
  disabled,
}: Props) {
  const { control } = useFormContext();

  const items = useWatch({ name: 'items' });
  const currentItem = items ? items[index] : { checked: false };
  const checked = Boolean(currentItem?.checked);
  const { t } = useTranslation('app');

  return (
    <Flex direction="column" gap={{ xs: 8, md: 16 }} fullWidth>
      <Flex fullWidth>
        <SelectInput
          options={refundReasons.map((reason) => ({
            label: t(reason.name),
            value: reason.id,
          }))}
          name={`items[${index}].reason_id`}
          placeholder="selectReason"
          control={control}
          isSearchable={false}
          isDisabled={disabled}
          changeHandler={(value) => {
            if (value) {
              if (onChange) {
                onChange(value);
              }
            }
          }}
          required={checked || undefined}
        />
      </Flex>
    </Flex>
  );
}
