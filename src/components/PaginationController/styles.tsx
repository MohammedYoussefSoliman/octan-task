import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

import { Flex } from '../Grids';

type StepButtonType = {
  active?: boolean;
};

export const Wrapper = styled(Flex)`
  label: pagination-wrapper;
  .navigation--button {
    ${({ theme }) => css`
      background-color: ${theme.colors.shades[100]};
    `}
    &:disabled {
      ${({ theme }) => css`
        background-color: ${theme.colors.shades[400]};
      `}
    }
  }
`;

export const DotButton = styled('button')<StepButtonType>`
  label: step-button;
  all: unset;
  height: 32px;
  width: 32px;
  border-radius: 50px;
  font-size: 12px;
  font-family: inherit;
  font-weight: 600;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  ${({ theme, active }) => css`
    color: ${active ? theme.colors.shades[100] : theme.colors.grey[400]};
    background-color: ${active
      ? theme.pallet.primary[500]
      : theme.colors.shades[100]};
    &:hover {
      background-color: ${active
        ? theme.pallet.primary[600]
        : theme.pallet.primary[50]};
    }
    border: 2px solid ${theme.colors.shades[100]};
  `}

  ${devices.sm} {
    font-size: 14px;
  }
  ${devices.md} {
    font-size: 18px;
    height: 45px;
    width: 45px;
    border-width: 3px;
  }
`;
