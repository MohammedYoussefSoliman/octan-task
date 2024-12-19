import { css } from '@emotion/react';
import styled from '@emotion/styled';

import images from '@/assets/images';
import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

type PanelProps = {
  hide?: boolean;
};

export const FormWrapper = styled(Flex)`
  .form {
    width: 100%;
    min-height: 100%;
  }
  .resend--button {
    all: unset;
    cursor: pointer;
  }
`;
export const NafathGuildWrapper = styled(Flex)`
  label: nafath-guild-wrapper;
  border-radius: 10px;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.orange[700]};
    background-color: ${theme.colors.orange[100]};
  `}
  ${devices.md} {
    border-radius: 15px;
  }
`;

export const Panel = styled('div')<PanelProps>`
  width: 100%;
  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}
`;

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

export const AgreementWrapper = styled(Flex)`
  label: digital-agreement-paper;
  .agreement--content {
    max-height: 70vh;
    overflow-y: auto;
    width: 100%;
    ${devices.md} {
      max-height: 70vh;
    }
    ${devices.lg} {
      max-height: 60vh;
    }
  }
  .agreement--button {
    width: 100%;
    ${devices.md} {
      width: 200px;
    }
  }
`;

export const InlineWrapper = styled('div')`
  display: inline;
  width: 100%;
  p {
    display: inline;
    margin-right: 4px;
  }
`;

export default Side;
