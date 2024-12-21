import React from 'react';

import { useTheme } from '@emotion/react';

import {
  Button,
  Form,
  Flex,
  Icon,
  TextInput,
  PhoneNumberInput,
  Paper,
  P1,
  H5,
} from '@/components';

type FormType = {
  firstName: string;
  lastName: string;
  nationalId?: string;
  dateOfBirth?: string;
  phoneNumber: string;
};

type Props = {
  firstName: string;
  lastName: string;
  nationalId: string;
  dateOfBirth?: string;
  phone: string;
};

export default function PersonalInfo({
  firstName,
  lastName,
  nationalId,
  dateOfBirth,
  phone,
}: Props) {
  const { pallet } = useTheme();
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(async (data: FormType) => {
    setSubmitting(true);
    console.log(data);
  }, []);

  return (
    <Form
      defaultValues={{
        firstName,
        lastName,
        nationalId: nationalId.replace(/^(\d{3})\d+(\d{2})$/, '$1xxxxx$2'),
        dateOfBirth,
        dialCode: phone.slice(0, 4),
        phoneNumber: phone.substring(4),
      }}
      onSubmit={onSubmit}
      className="info-form"
    >
      {({ control, handleSubmit }) => {
        return (
          <>
            <Flex
              align="center"
              justify="space-between"
              fullWidth
              mb={{ xs: 16, md: 30 }}
            >
              <H5 text="personalInformation" />
              <Flex align="center" gap={{ xs: 6, md: 8, lg: 16 }}>
                <Icon name="edit" color={pallet.primary[500]} />
                <P1 text="edit" color={pallet.primary[500]} />
              </Flex>
            </Flex>
            <Paper
              p={{
                xs: '16px',
                md: '30px 42px',
              }}
              fullWidth
            >
              <Flex
                direction="column"
                gap={{ xs: 7, md: 15, lg: 30 }}
                fullWidth
              >
                <TextInput
                  label="firstName"
                  name="firstName"
                  placeholder="name"
                  value={firstName}
                  control={control}
                  disabled
                />
                <TextInput
                  label="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="name"
                  control={control}
                  disabled
                />
                <TextInput
                  label="dateOfBirth"
                  name="dateOfBirth"
                  control={control}
                  disabled
                />
                <TextInput
                  name="nationalId"
                  label="nationalId"
                  control={control}
                  disabled
                />
                <PhoneNumberInput
                  label="phoneNumber"
                  name="phoneNumber"
                  placeholder="enterPhoneNumber"
                  control={control}
                />
                <Button
                  isLoading={submitting}
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                >
                  update
                </Button>
              </Flex>
            </Paper>
          </>
        );
      }}
    </Form>
  );
}
