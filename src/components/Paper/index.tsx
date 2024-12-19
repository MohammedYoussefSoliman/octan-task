import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';

export const Paper = styled(Flex)`
  label: paper;
  ${({ theme }) => css`
    background-color: ${theme.colors.shades[100]};
  `}
  border-radius: 12px;
  padding: 16px;
  min-width: 250px;
  /* ${devices.md} {
    border-radius: 20px;
  } */
  ${devices.xl} {
    padding: 24px;
  }
  ${devices.xxl} {
    padding: 32px 60px;
  }
`;
