import React from 'react';

import { Flex, Button } from '@/components';
import { useAppDispatch } from '@/hooks';
import { modalOverride, updateOrderCheckAuth } from '@/state/ui-actions/slice';

import AuthPaper from './AuthPaper';
import AuthStatus from './AuthStatus';

type Props = {
  authSuccess: boolean;
};

export default function FinalAuthStatus({ authSuccess }: Props) {
  const dispatch = useAppDispatch();

  const onClose = React.useCallback(() => {
    dispatch(modalOverride([]));
    dispatch(updateOrderCheckAuth('natural'));
  }, [dispatch]);

  return (
    <AuthPaper>
      <Flex
        gap={{ xs: 10, md: 20, lg: 40 }}
        direction="column"
        justify="center"
        align="center"
        maxWidth="500px"
      >
        <AuthStatus type="register" authSuccess={authSuccess} />
        <Button onClick={onClose} fullWidth>
          {authSuccess ? 'confirm' : 'returnToOrders'}
        </Button>
      </Flex>
    </AuthPaper>
  );
}
