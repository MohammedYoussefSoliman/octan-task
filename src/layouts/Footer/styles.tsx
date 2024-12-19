import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

const Wrapper = styled(Flex)`
  label: app-footer;
  margin-top: auto;
  ${({ theme }) => css`
    background: ${theme.pallet.primary[1000]};
  `}
  .footer--lower {
    ${({ theme }) => css`
      border-top: 0.5px solid ${theme.colors.shades[100]};
    `}
  }
  .input--wrapper {
    padding: 8px 24px;
    input {
      font-size: 16px;
    }
  }
`;

export default Wrapper;
