import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

type HeaderWrapper = {
  scrolled?: boolean;
  variant?: 'white' | 'transparent';
};

const Wrapper = styled(Flex)<HeaderWrapper>`
  label: app-header;
  position: fixed;
  top: 0;
  height: 80px;
  z-index: 1000;
  ${({ theme, variant }) =>
    variant === 'white'
      ? css`
          position: sticky;
          background: ${theme.colors.shades[100]};
          box-shadow: ${theme.shadows[6]};
        `
      : css`
          background: transparent;
          .auth--button {
            background-color: ${theme.colors.shades[100]};
          }
        `}
  ${({ theme, scrolled }) =>
    scrolled &&
    css`
      background: ${theme.colors.shades[100]};
      box-shadow: ${theme.shadows[6]};
    `}
`;

export default Wrapper;
