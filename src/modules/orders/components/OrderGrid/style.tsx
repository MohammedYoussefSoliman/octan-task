import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

const OrderGridWrapper = styled(Flex)`
  .grid--header {
    height: 48px;
    border-radius: 6px;

    ${({ theme }) => css`
      background: ${theme.colors.shades[300]};
    `}
  }
  .order--img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default OrderGridWrapper;
