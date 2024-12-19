import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

type PanelProps = {
  hidden?: boolean;
};

export const StyledPanel = styled('div')<PanelProps>`
  label: stepper-panel;
  width: 100%;
  min-width: 100%;
  ${devices.md} {
    width: 100%;
    min-width: 280px;
  }
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;

type StepButtonType = {
  active?: boolean;
  completed?: boolean;
  failed?: boolean;
};

export const StepButton = styled('button')<StepButtonType>`
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
  ${({ theme: { colors, pallet, branding }, active, completed, failed }) => css`
    color: ${active || completed || failed
      ? colors.shades[100]
      : colors.grey[400]};
    background-color: ${active
      ? colors.orange[500]
      : completed
        ? (branding?.primaryColor ?? pallet.primary[500])
        : failed
          ? colors.red[500]
          : colors.shades[100]};
    &:hover {
      background-color: ${active
        ? colors.orange[600]
        : failed
          ? colors.red[600]
          : completed
            ? (branding?.primaryColor ?? pallet.primary[600])
            : colors.shades[200]};
    }
    border: 2px solid ${colors.shades[100]};
  `}

  ${devices.sm} {
    font-size: 14px;
  }
  ${devices.md} {
    font-size: 18px;
    height: 50px;
    width: 50px;
    border-width: 3px;
  }
`;

export const StepLine = styled('div')<StepButtonType>`
  height: 2px;
  flex: 1;
  margin: 0 -24px;
  z-index: 0;
  ${devices.md} {
    min-width: 50px;
  }
  ${({ theme: { colors, pallet, branding }, completed }) => css`
    background-color: ${completed
      ? (branding.primaryColor ?? pallet.primary[500])
      : branding.isEnabled
        ? colors.shades[400]
        : pallet.primary[100]};
  `}
  ${devices.md} {
    height: 3px;
  }
`;
