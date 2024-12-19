import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tinycolor from 'tinycolor2';

import devices from '@/theme/sizes';

import { resolveButtonConfig, resolveIconButtonConfig } from './mixins';
import { StyledButtonType, StyledNavButton } from './types';

const GeneralStyles = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 0 16px;
  font-family: 'noor';
  text-transform: capitalize;
  font-family: inherit;
  cursor: pointer;
  ${devices.md} {
    padding: 0 24px;
  }
  ${devices.lg} {
    padding: 0 32px;
  }
  ${devices.xxl} {
    padding: 0 32px;
  }
`;

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !['width', 'height', 'color'].includes(prop);

export const StyledButton = styled(GeneralStyles, {
  shouldForwardProp,
})<StyledButtonType>`
  label: button;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      padding: 0;
    `};
  ${({ whitBg, theme, color }) =>
    whitBg &&
    css`
      background: ${theme.colors.shades[100]};
      &:hover {
        background: ${color
          ? tinycolor(color).setAlpha(0.15).toString()
          : theme.pallet.primary[50]};
      }
    `}

  ${({ variant, size, disabled, color, borderRadius }) =>
    resolveButtonConfig(variant, size, disabled, color, borderRadius)}
`;

export const StyledIconButton = styled(GeneralStyles)<StyledButtonType>`
  label: icon-button;
  padding: 0 !important;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ whitBg, theme, color }) =>
    whitBg &&
    css`
      background: ${theme.colors.shades[100]};
      &:hover {
        background: ${color
          ? tinycolor(color).setAlpha(0.15).toString()
          : theme.pallet.primary[50]};
      }
    `}
  ${({ variant, size, disabled, color, borderRadius }) =>
    resolveIconButtonConfig(variant, size, disabled, color, borderRadius)}
`;

export const StyledNavigationButton = styled(GeneralStyles)<StyledNavButton>`
  label: navigation-button;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 6px;

  ${({ theme }) => css`
    &:disabled {
      background: ${theme.colors.grey[200]};
      color: ${theme.colors.grey[300]};
    }

    &:enabled {
      background: ${theme.colors.grey[200]};
      color: ${theme.colors.grey[500]};
      &:hover {
        background: ${theme.colors.grey[300]};
      }
    }
  `}

  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.colors.success[200]} !important;
      color: ${theme.colors.white} !important;
      &:hover {
        background: ${tinycolor(theme.colors.success[200])
          .darken(0.06)
          .toString()} !important;
      }
    `}

  ${devices.lg} {
    width: 52px;
    height: 52px;
    border-radius: 9px;
  }
`;
