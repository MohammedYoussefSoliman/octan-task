import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

type PanelProps = {
  hidden?: boolean;
};

export const StyledPanel = styled('div')<PanelProps>`
  min-width: 280px;
  width: 100%;
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;

export const TabsWrappers = styled(Flex)`
  border-radius: 25px;
  margin-inline-start: auto;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.grey[100]};
    background-color: ${theme.colors.shades[100]};
  `}
`;

type TabButtonType = {
  active?: boolean;
};

export const TabButton = styled('button')<TabButtonType>`
  label: tab-button;
  all: unset;
  height: 36px;
  min-width: 100px;
  border-radius: 50px;
  font-size: 12px;
  font-family: inherit;
  font-weight: 600;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => css`
    color: ${theme.colors.grey[400]};
    background-color: ${theme.colors.shades[100]};
    &:hover {
      background-color: ${theme.pallet.primary[50]};
      color: ${theme.pallet.primary[600]};
    }
  `}
  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.colors.shades[100]};
      background-color: ${theme.pallet.primary[600]};
      &:hover {
        background-color: ${theme.pallet.primary[700]};
        color: ${theme.colors.shades[100]};
      }
    `}
   ${devices.sm} {
    font-size: 14px;
  }
  ${devices.md} {
    font-size: 18px;
    min-width: 150px;
  }
`;
