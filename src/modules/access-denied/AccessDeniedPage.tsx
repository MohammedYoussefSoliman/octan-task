import { AccessDenied } from '@/assets/lotties';
import { Flex, P1 } from '@/components';
import { useBreakpoints } from '@/hooks';

import Wrapper from './styles';

export default function AccessDeniedScreen() {
  const { large, medium } = useBreakpoints();

  return (
    <Wrapper>
      <Flex
        gap={{ xs: 8, md: 16, lg: 32 }}
        direction="column"
        align="center"
        justify="center"
        fullHeight
        fullWidth
      >
        <AccessDenied size={large ? 600 : medium ? 400 : 270} />
        <P1 text="accessDenied" />
      </Flex>
    </Wrapper>
  );
}
