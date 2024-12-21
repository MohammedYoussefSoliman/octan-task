import React from 'react';

import { Divider, Flex, Container } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeHeaderVariant } from '@/state/ui/slice';

import AccountHeader from './components/AccountHeader';
import BankAccounts from './components/BankAccounts/BankAccounts';
import PersonalInfo from './components/PersonalInfo';
import UserAddresses from './components/UserAddresses';
import Wrapper from './style';

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const {
    consumerAuth: { user },
    ui: { language },
  } = useAppSelector((state) => state);
  const customerName = user.customer_names[language];
  const firstName = customerName?.firstName || '';
  const lastName = customerName?.lastName || '';

  React.useEffect(() => {
    // adjust the header for this module
    dispatch(changeHeaderVariant('white'));
  }, [dispatch]);
  return (
    <Wrapper>
      <Container>
        <Flex
          align="center"
          justify="flex-start"
          gap={{ xs: 12, md: 25, lg: 50 }}
          mt="60px"
          mb="60px"
          fullWidth
          direction="column"
        >
          <AccountHeader
            firstName={firstName}
            lastName={lastName}
            image={user.avatar}
          />
          <Divider />
          <PersonalInfo
            firstName={firstName}
            lastName={lastName}
            nationalId={user.national_id || ''}
            dateOfBirth={user.date_of_birth}
            phone={user.phone_number}
          />
          <Divider />
          <UserAddresses />
          <Divider />
          <BankAccounts />
        </Flex>
      </Container>
    </Wrapper>
  );
}
