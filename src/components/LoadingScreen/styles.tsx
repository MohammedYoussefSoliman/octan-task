import { css } from '@emotion/react';
import styled from '@emotion/styled';

type WrapperProps = {
  background?: string;
};

const Wrapper = styled('div')<WrapperProps>`
  label: loading-screen-wrapper;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: #fff;
  ${({ background }) =>
    background &&
    css`
      background: ${background};
    `}
`;

export default Wrapper;
