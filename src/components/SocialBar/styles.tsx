import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

const SocialButton = styled(Flex)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  ${({ theme }) => css`
    background: ${theme.colors.shades[100]};
  `}
`;

export default SocialButton;
