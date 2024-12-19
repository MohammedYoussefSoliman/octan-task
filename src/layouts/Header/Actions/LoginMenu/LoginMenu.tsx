import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Icon, P3 } from '@/components';

import { LoginCard, LoginCardButton } from './styles';

function LoginMenu({ state }: { state: 'show' | 'hide' }) {
  const navigate = useNavigate();
  const { colors, pallet } = useTheme();

  return (
    <LoginCard state={state}>
      <LoginCardButton onClick={() => navigate('/login')}>
        <Icon name="user" color="white" />
        <P3 textAlign="center" color={colors.shades[100]}>
          clientLoginButton
        </P3>
      </LoginCardButton>
      <LoginCardButton
        onClick={() => {
          window.location.href = 'https://merchant.yamm.sa/';
        }}
        variant="light"
      >
        <Icon name="business" />
        <P3 textAlign="center" color={pallet.primary[600]}>
          businessLoginButton
        </P3>
      </LoginCardButton>
    </LoginCard>
  );
}

export default LoginMenu;
