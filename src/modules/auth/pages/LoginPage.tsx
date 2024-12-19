import React from 'react';

import { useNavigate } from 'react-router-dom';

import urls from '@/helpers/urls';
import { useAppDispatch, useGetQuerySearch } from '@/hooks';
import AuthForm from '@/modules/auth/AuthForm';
import { setOrderStep } from '@/state/order/slice';
import { setAuthMode } from '@/state/ui-actions/slice';

import Wrapper from './styles';

export default function LoginPage() {
  const { createOrder } = useGetQuerySearch();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setAuthMode('page'));
    if (createOrder) {
      dispatch(setOrderStep(1));
    }
  }, [createOrder, dispatch]);

  return (
    <Wrapper>
      <AuthForm
        onRegisterFailed={() => {
          navigate(urls.loginFailed);
        }}
      />
    </Wrapper>
  );
}
