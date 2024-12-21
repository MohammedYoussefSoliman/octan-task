import { useNavigate } from 'react-router-dom';

import { NotFound as NotFoundLottie } from '@/assets/lotties';
import { Flex, Button } from '@/components';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Flex
      gap={{ xs: 10, md: 20, lg: 40 }}
      direction="column"
      align="center"
      justify="center"
      fullWidth
      fullHeight
    >
      <NotFoundLottie />
      <Button onClick={() => navigate('/')}>home</Button>
    </Flex>
  );
}
