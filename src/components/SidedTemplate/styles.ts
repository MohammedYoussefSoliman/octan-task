import { css } from '@emotion/react';
import styled from '@emotion/styled';

import images from '@/assets/images';
import { Flex } from '@/components';
import devices from '@/theme/sizes';

const Side = styled(Flex)`
  flex: 1;
  width: 100%;
  &.left {
    background-image: url(${images.SIDE_BG});
    background-size: cover;
    background-position: center;
    flex: unset;
    ${devices.lg} {
      flex: 1;
      width: fit-content;
      height: 100%;
    }
  }
  ${devices.lg} {
    width: 50%;
  }
  &.right {
    flex: 1;
    ${({ theme }) => css`
      background: ${theme.colors.shades[100]};
    `}
    ${devices.md} {
      align-items: center;
    }
    .signUp {
      align-self: center;
      &--button {
        all: unset;
        cursor: pointer;
      }
    }
  }
`;

export default Side;
