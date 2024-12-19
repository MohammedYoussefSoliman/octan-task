import { useNavigate } from 'react-router-dom';

import { Flex, Button } from '@/components';
import urls from '@/helpers/urls';
import AuthStatus from '@/modules/auth/AuthForm/AuthStatus';

import AuthPaper from '../AuthForm/AuthPaper';

import Wrapper from './styles';

export default function FailedStatusPage() {
  const navigate = useNavigate();

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
          <AuthStatus type="register" authSuccess={false} />
          <Button
            onClick={() => {
              navigate(urls.login);
            }}
            fullWidth
          >
            returnToLogin
          </Button>
        </Flex>
      </AuthPaper>
    </Wrapper>
  );
}
