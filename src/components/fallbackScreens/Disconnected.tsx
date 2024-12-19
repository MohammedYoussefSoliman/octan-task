import { useTheme } from '@emotion/react';

import { H3 } from '@/components/Typography';

import Wrapper from './styles';

export function Disconnected() {
  const theme = useTheme();
  return (
    <Wrapper align="center" justify="center">
      <H3 text="youAreDisconnected" color={theme.colors.error[300]} />
    </Wrapper>
  );
}
