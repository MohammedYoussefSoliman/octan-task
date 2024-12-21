import { useNavigate } from 'react-router-dom';

import { ServerError as ServerErrorLottie } from '@/assets/lotties';
import { Flex, Button, H4 } from '@/components';

export default function ServerError() {
  const navigate = useNavigate();
  return (
    <Flex
      gap={{ xs: 10, sm: 20, md: 24, lg: 40 }}
      direction="column"
      align="center"
      justify="center"
      fullWidth
      fullHeight
    >
      <ServerErrorLottie />
      <H4 text="serverError" />
      <Button onClick={() => navigate('/')}>home</Button>
    </Flex>
  );
}
