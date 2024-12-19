import { useTheme } from '@emotion/react';

import { Form, EmailInput, H6, P3, Flex, Button } from '@/components';

export default function SubscribeForm() {
  const { colors } = useTheme();

  return (
    <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }}>
      <Flex direction="column" gap="4px">
        <H6 text="stayUpdated" fontSize="20px" color={colors.shades[100]} />
        <P3
          text="receivePromotion"
          fontSize="20px"
          color={colors.shades[100]}
        />
      </Flex>
      <Form
        defaultValues={{
          email: '',
        }}
        validateOn="onSubmit"
      >
        {({ control }) => (
          <Flex gap={{ xs: 6, md: 12, lg: 24 }}>
            <EmailInput
              name="email"
              placeholder="email"
              control={control}
              height="50px"
              rounded
              required
            />
            <Button size="md">send</Button>
          </Flex>
        )}
      </Form>
    </Flex>
  );
}
