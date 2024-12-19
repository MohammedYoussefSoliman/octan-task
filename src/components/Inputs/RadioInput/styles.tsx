import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tinycolor from 'tinycolor2';

import { Flex } from '@/components/Grids';
import getTheme from '@/theme';
import devices from '@/theme/sizes';
import { StoreBranding } from '@/theme/types';

const theme = getTheme('light');

type WithBrandingType = {
  branding?: StoreBranding;
};

export const OptionLabel = styled(Flex)<WithBrandingType>`
  label: radio-option;
  position: relative;
  &:hover {
    .radio--button {
      ${({ theme: { pallet, branding } }) => css`
        border-color: ${branding.primaryColor ?? pallet.primary[500]};
      `}
    }
  }
`;

type RadioType = {
  checked: boolean;
  branding?: StoreBranding;
};

export const RadioButton = styled('button')<RadioType>`
  label: radio-button;
  all: unset;
  width: 16px;
  height: 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${devices.md} {
    width: 24px;
    height: 24px;
  }
  border: 1px solid ${theme.colors.grey[400]};
  .selected {
    display: none;
    width: 10px;
    height: 10px;
    ${devices.md} {
      width: 14px;
      height: 14px;
    }
    border-radius: 20px;
    ${({ checked }) =>
      checked &&
      css`
        display: block;
      `}
    ${({ branding }) => css`
      background: ${branding?.primaryColor ?? theme.pallet.primary[500]};
    `}
  }
  &:hover {
    ${({ checked, branding }) =>
      checked
        ? css`
            border-color: ${branding?.primaryColor ??
            theme.pallet.primary[600]};
            .selected {
              background: ${branding?.primaryColor ??
              theme.pallet.primary[600]};
            }
          `
        : css`
            background: ${branding?.secondaryColor
              ? tinycolor(branding?.secondaryColor).darken(10).toString()
              : theme.pallet.primary[50]};
          `}
  }
`;

export const BanRadioButton = styled('button')<RadioType>`
  label: ban-radio-button;
  all: unset;
  height: 36px;
  min-width: 80px;
  border-radius: 50px;
  font-size: 10px;
  font-family: inherit;
  font-weight: 500;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  color: ${theme.colors.grey[400]};
  background-color: ${theme.colors.shades[100]};
  &:hover {
    background-color: ${theme.pallet.primary[50]};
    color: ${theme.pallet.primary[600]};
  }
  ${({ checked, branding }) =>
    checked &&
    css`
      color: ${theme.colors.shades[100]};
      background-color: ${branding?.primaryColor ?? theme.pallet.primary[600]};
      &:hover {
        background-color: ${branding?.primaryColor ??
        theme.pallet.primary[700]};
        color: ${theme.colors.shades[100]};
      }
    `}
  ${devices.sm} {
    font-size: 12px;
  }
  ${devices.md} {
    font-size: 15px;
    min-width: 120px;
  }
  &:lang(en) {
    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
`;

type WrapperType = {
  variant: 'normal' | 'ban';
};

export const RadioWrapper = styled(Flex)<WrapperType>`
  ${({ variant }) =>
    variant === 'ban' &&
    css`
      border-radius: 25px;
      border: 1px solid ${theme.colors.grey[100]};
      background-color: ${theme.colors.shades[100]};
    `}
`;
