import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

const CreateOrderButton = styled(Flex)`
  label: create-order-button;
  border-radius: 10px;
  ${({ theme }) => css`
    border: 1px solid ${theme.pallet.primary[500]};
    background-color: ${theme.colors.shades[100]};
  `}

  ${devices.md} {
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      ${({ theme }) => css`
        background-color: ${theme.pallet.primary[50]};
      `}
    }
  }
  ${devices.lg} {
    border-radius: 20px;
  }
`;

export default CreateOrderButton;
