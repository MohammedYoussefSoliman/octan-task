import { CSSProperties } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

type FigureType = {
  dense?: boolean;
  withPadding?: boolean;
  imageBehavior?: CSSProperties['objectFit'];
};

const StyledFigure = styled('figure')<FigureType>`
  label: figure;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 75px;
  border-radius: 4px;
  overflow: hidden;
  ${({ theme }) => css`
    background-color: ${theme.colors.shades[400]};
  `}
  ${devices.md} {
    width: 120px;
    height: 100px;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${({ dense }) =>
    dense &&
    css`
      width: 62px;
      height: 40px;
      ${devices.md} {
        width: 72px;
        height: 50px;
      }
    `}
  ${({ withPadding }) =>
    withPadding &&
    css`
      padding: 6px;
    `}
  ${({ imageBehavior }) =>
    imageBehavior &&
    css`
      .image {
        object-fit: ${imageBehavior};
      }
    `}
`;

export default StyledFigure;
