import React from 'react';

import { Button, Form, Flex, LocalizedNumberInput } from '@/components';
import { formDataHandler } from '@/helpers/functions';
import { useAxiosInstance } from '@/hooks';

type Props = {
  callback: () => void;
};

export default function NationalForm({ callback }: Props) {
  const { post } = useAxiosInstance();
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (data: any) => {
      setSubmitting(true);
      try {
        await post('customer/update-national-id', formDataHandler(data));
        callback();
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    },
    [callback, post],
  );

  return (
    <Form onSubmit={onSubmit}>
      {({ control }) => (
        <Flex gap={{ xs: 6, md: 8, lg: 16 }} direction="column" fullWidth>
          <LocalizedNumberInput
            name="national_id"
            label="nationalId"
            required="nationalIdRequired"
            control={control}
            maxLength={10}
            validationRules={{
              minLength: { value: 10, message: 'nationalIdMinLength' },
            }}
          />
          <Button isLoading={submitting} fullWidth>
            updateNationalId
          </Button>
        </Flex>
      )}
    </Form>
  );
}
