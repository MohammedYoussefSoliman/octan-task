import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { Button, Flex } from '@/components';
import urls from '@/helpers/urls';
import { useAppDispatch, useGetQuerySearch } from '@/hooks';
import AuthStatus from '@/modules/auth/AuthForm/AuthStatus';
import profileService from '@/state/auth/profileService';
import { setRequireNafathAuthentication } from '@/state/auth/slice';
import { setOrderStep } from '@/state/order/slice';

import AuthPaper from '../AuthForm/AuthPaper';

import Wrapper from './styles';

const { getService: getUserProfile } = profileService;

export default function SuccessStatusPage() {
  const { createOrder } = useGetQuerySearch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type, nafathVerified } = state;

  React.useEffect(() => {
    dispatch(getUserProfile({}));

    if (createOrder) {
      dispatch(setOrderStep(1));
    }

    if (nafathVerified) {
      dispatch(setRequireNafathAuthentication('verified'));
    }
    const timer = setTimeout(() => {
      if (createOrder) {
        navigate(urls.createOrder);
      } else {
        navigate(urls.orders);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [createOrder, dispatch, nafathVerified, navigate]);

  return (
    <Wrapper>
      <AuthPaper>
        <Flex
          gap={{ xs: 10, md: 20, lg: 40 }}
          direction="column"
          justify="center"
          align="center"
          maxWidth="500px"
        >
          <AuthStatus authSuccess type={type || 'login'} />
          <Button
            onClick={() => {
              if (createOrder) {
                navigate(urls.createOrder);
              } else {
                navigate(urls.orders);
              }
            }}
            fullWidth
          >
            {createOrder ? 'proceedToYourOrder' : 'myOrders'}
          </Button>
        </Flex>
      </AuthPaper>
    </Wrapper>
  );
}
