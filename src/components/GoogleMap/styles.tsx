import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

export const LocationButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  ${({ theme }) => css`
    background-color: ${theme.pallet.primary[50]};
    &:hover {
      outline: 1px solid ${theme.pallet.primary[400]};
    }
  `}
`;

export const LocationsWrapper = styled(Flex)`
  max-height: 150px;
  overflow-y: auto;
`;
