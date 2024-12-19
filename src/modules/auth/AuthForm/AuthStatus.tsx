import { Success as SuccessLottie, ErrorLottie } from '@/assets/lotties';
import { Flex } from '@/components/Grids';
import { H3, P1 } from '@/components/Typography';

type Props = {
  authSuccess: boolean;
  type?: 'login' | 'register';
};

function Header({ authSuccess, type = 'register' }: Props) {
  const contentText = {
    login: {
      header: {
        success: 'loginSuccess',
        failure: 'loginFailed',
      },
      body: {
        success: 'successBody',
        failure: 'failedBody',
      },
    },
    register: {
      header: {
        success: 'registerSuccess',
        failure: 'registerFailed',
      },
      body: {
        success: 'successBody',
        failure: 'failedBody',
      },
    },
  };

  return (
    <Flex
      gap={{ xs: 6, md: 8 }}
      direction="column"
      align="center"
      justify="center"
      maxWidth="400px"
    >
      <H3
        text={contentText[type].header[authSuccess ? 'success' : 'failure']}
        capitalizeFirstLetter
      />
      <P1
        text={contentText[type].body[authSuccess ? 'success' : 'failure']}
        capitalizeFirstLetter
      />
    </Flex>
  );
}

export default function AuthStatus({ authSuccess, type }: Props) {
  return (
    <Flex
      gap={{ xs: 10, md: 20, lg: 40 }}
      direction="column"
      align="center"
      justify="center"
      maxWidth="500px"
    >
      {authSuccess ? <SuccessLottie size={150} /> : <ErrorLottie size={150} />}
      <Header authSuccess={authSuccess} type={type} />
    </Flex>
  );
}
