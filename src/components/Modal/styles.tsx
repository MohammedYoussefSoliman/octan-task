import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

type WrapperType = {
  backgroundImage?: string;
  maxHeight?: string;
};

const Wrapper = styled('div')<WrapperType>`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ backgroundImage }) =>
    backgroundImage &&
    css`
      background-image: url(${backgroundImage});
      background-size: cover;
      background-position: center;
    `}
  .modal--card {
    width: 90vw;
    .modal--body {
      ${({ maxHeight }) =>
        maxHeight
          ? css`
              max-height: ${maxHeight};
            `
          : css`
              max-height: 80vh;
            `}
      width: 100%;
      overflow-y: auto;
    }
  }
  .confirm-modal--card {
    width: 90vw;
    ${devices.lg} {
      width: 50vw;
    }
    ${devices.xxl} {
      width: 40vw;
    }
  }
`;

export default Wrapper;
