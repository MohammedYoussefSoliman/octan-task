import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

const Counter = styled.span`
  font-size: 28px;
  font-weight: 600;
  ${({ theme }) => css`
    color: ${theme.colors.shades[100]};
  `}
  ${devices.md} {
    font-size: 36px;
  }
  ${devices.lg} {
    font-size: 42px;
  }
  ${devices.xl} {
    font-size: 48px;
  }
`;

export default Counter;
