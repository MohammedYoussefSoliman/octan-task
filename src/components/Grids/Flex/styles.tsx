import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  resolveSpacing,
  widthResponsiveStyle,
  directionResponsiveStyle,
  alignResponsiveStyle,
  justifyResponsiveStyle,
  maxWidthResponsiveStyle,
  heightResponsiveStyle,
  flexResponsiveStyle,
  gapResponsiveStyle,
} from './mixins';
import { StyledFlexWrapper } from './types';

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) &&
  !['gap', 'width', 'wrap', 'height', 'direction'].includes(prop);

const Wrapper = styled('div', { shouldForwardProp })<StyledFlexWrapper>`
  ${css`
    label: flex;
  `}
  display: flex;
  ${({ width }) =>
    width
      ? widthResponsiveStyle(width)
      : css`
          width: fit-content;
        `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}
    ${({ height }) => height && heightResponsiveStyle(height)}
    ${({ withWrap }) =>
    withWrap &&
    css`
      flex-wrap: wrap;
    `}
    ${({ maxWidth }) => maxWidth && maxWidthResponsiveStyle(maxWidth)}
    ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
    ${({ direction }) => direction && directionResponsiveStyle(direction)}
    ${({ justify }) => justify && justifyResponsiveStyle(justify)}
    ${({ align }) => align && alignResponsiveStyle(align)}
    ${({ flex }) => flex && flexResponsiveStyle(flex)}
    ${({ gap }) => gap && gapResponsiveStyle(gap)}

    ${({
    p,
    pb,
    pe,
    ph,
    pl,
    pr,
    ps,
    pt,
    pv,
    m,
    mv,
    mh,
    mt,
    mb,
    ml,
    mr,
    ms,
    me,
  }) =>
    resolveSpacing({
      p,
      pb,
      pe,
      ph,
      pl,
      pr,
      ps,
      pt,
      pv,
      m,
      mv,
      mh,
      mt,
      mb,
      ml,
      mr,
      ms,
      me,
    })}
`;

export default Wrapper;
