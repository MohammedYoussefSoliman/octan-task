import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

type SpinnerWrapperProps = {
  wrapperPadding?: React.CSSProperties['padding'];
  size?: React.CSSProperties['width'];
};

const SpinnerWrapper = styled('div')<SpinnerWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ wrapperPadding }) =>
    wrapperPadding &&
    css`
      padding: ${wrapperPadding};
    `}
  ${({ size }) =>
    size &&
    css`
      width: ${size};
      height: ${size};
    `}
`;

export default SpinnerWrapper;
