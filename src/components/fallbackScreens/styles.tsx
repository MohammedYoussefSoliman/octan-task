import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';

const Wrapper = styled(Flex)`
  position: absolute;
  top: 0;
  label: fallback-wrapper;
  width: 100vw;
  height: 100vh;
  ${({ theme }) => css`
    background-color: ${theme.colors.shades[200]};
  `}
`;

export default Wrapper;
