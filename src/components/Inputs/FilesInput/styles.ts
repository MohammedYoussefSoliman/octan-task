import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';

export const ImageWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    ${({ theme: { colors, branding } }) => css`
      background-image: linear-gradient(
        0deg,
        ${branding.primaryColor ?? colors.purple[900]} 0%,
        rgba(255, 255, 255, 0) 100%
      );
    `}
  }
  .delete--button {
    position: absolute;
    top: 0;
    left: -12px;
    ${({ theme: { pallet, colors, branding } }) => css`
      border: 1.5px solid ${branding.primaryColor ?? pallet.primary[600]};
      background-color: ${colors.shades[100]};
      &:enabled {
        cursor: pointer;
        &:hover {
          background-color: ${colors.shades[200]};
        }
      }
    `}
    border-radius: 12px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const EmptyBtn = styled('button')`
  ${({ theme: { pallet, colors, branding } }) => css`
    width: 100%;
    height: 100%;
    border: 2px dashed ${branding.primaryColor ?? pallet.primary[500]};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    &:enabled {
      &:hover {
        background-color: ${colors.shades[200]};
      }
    }
    &:disabled {
      background-color: ${colors.shades[300]};
      border-color: ${colors.grey[400]};
    }
  `}
`;

export const ThumbWrapper = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 14px;
  .thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type PositionedFlexType = {
  position: 'absolute' | 'relative';
};

export const PositionedFlex = styled(Flex)<PositionedFlexType>`
  ${({ position }) => css`
    position: ${position};
  `}
  &.loading {
    overflow: hidden;
    border-radius: 14px;
  }
`;
export const FileInput = styled('input')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;
