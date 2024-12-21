import { useNavigate } from 'react-router-dom';

import { ErrorLottie } from '@/assets/lotties';
import { Flex, Button } from '@/components';
import { H4, P1 } from '@/components/Typography';
import urls from '@/helpers/urls';

export default function Maintenance() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      fullHeight
      fullWidth
    >
      <ErrorLottie size={150} />
      <H4 text="entryErrorHeader" textAlign="left" />
      <P1 text="entryErrorPragraph" textAlign="left" />
      <Button
        onClick={() => {
          navigate(urls.home);
        }}
      >
        entryErorrButon
      </Button>
    </Flex>
  );
}
