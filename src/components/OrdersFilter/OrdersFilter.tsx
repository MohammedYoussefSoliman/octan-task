import { useTheme } from '@emotion/react';

import { Form, TextInput, RadioInput, Flex, Icon } from '@/components';
import { RadioOptionType } from '@/components/Inputs/types';

import Wrapper from './styles';
import { FilterStateType } from './types';

type FormData = FilterStateType;

type OrdersFilterProps = {
  onChange: (data: FormData) => void;
  radioItems?: RadioOptionType[];
};

export default function OrdersFilter({
  onChange,
  radioItems,
}: OrdersFilterProps) {
  const { colors } = useTheme();

  return (
    <Form
      defaultValues={{
        status: 'inProgress',
      }}
    >
      {({ control, setValue, getValues }) => (
        <Wrapper
          direction={{ xs: 'column', sm: 'row' }}
          justify="space-between"
          align="center"
          gap={{ xs: 30, md: 12, lg: 24 }}
          fullWidth
        >
          <Flex width={{ xs: '100%', sm: '400px' }}>
            <TextInput
              control={control}
              name="search"
              placeholder="searchIdOrStoreName"
              onChange={(e) => {
                onChange({
                  status: getValues('status'),
                  search: e.target.value,
                });
              }}
              prefixComponent={<Icon name="search" color={colors.grey[200]} />}
              rounded
              dense
            />
          </Flex>
          {radioItems && (
            <RadioInput
              className="filter--input"
              variant="ban"
              setValue={setValue}
              getValues={getValues}
              options={radioItems}
              name="status"
              handleChange={(value) => {
                onChange({
                  search: getValues('search'),
                  status: `${value}`,
                });
              }}
            />
          )}
        </Wrapper>
      )}
    </Form>
  );
}
