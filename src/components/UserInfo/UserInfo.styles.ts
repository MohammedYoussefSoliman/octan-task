import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '../Grids';

export const UserWrapper = styled(Flex)<{
  dir: 'rtl' | 'ltr';
  transparentMode: boolean;
}>`
  label: user-wrapper;
  ${({ theme, dir, transparentMode }) => css`
    padding: ${dir === 'ltr' ? '5px 16px 5px 5px' : '5px 5px 5px 16px'};
    background-color: ${transparentMode
      ? 'transparent'
      : theme.pallet.primary[100]};
    outline: ${transparentMode
      ? `1px solid ${theme.colors.shades[100]}`
      : 'none'};
    border-radius: 100px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  `}
`;
