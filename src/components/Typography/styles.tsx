import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  configureAdornment,
  configureFontSize,
  configureHover,
  configureTruncation,
  manageFontSize,
} from './mixins';
import { StyledTextType } from './types';

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !['fontSize', 'height', 'color', 'lang'].includes(prop);

const StyledText = styled('span', { shouldForwardProp })<StyledTextType>`
  max-width: 100%;

  ${({
    fontFamily,
    color,
    textDecoration,
    textAlign,
    lineHeight,
    theme,
  }) => css`
    font-family: ${fontFamily || theme.font};
    &:lang(en) {
      text-decoration: ${textDecoration};
    }
    text-align: ${textAlign};
    line-height: ${lineHeight};
    color: ${color || theme.pallet.text.heading};
  `}
  ${({ fontSize, length, isHeader }) =>
    fontSize &&
    configureFontSize(
      isHeader ? manageFontSize(fontSize, length || 1) : fontSize,
    )};
  ${({ capitalizeFirstLetter }) =>
    capitalizeFirstLetter &&
    css`
      &:lang(en) {
        &:first-letter {
          text-transform: capitalize;
        }
      }
    `};
  ${({ truncationWidth }) =>
    truncationWidth && configureTruncation(truncationWidth)};
  ${({ startAdornment, lang }) =>
    startAdornment &&
    configureAdornment(startAdornment, 'before', lang || 'ar')};
  ${({ endAdornment, lang }) =>
    endAdornment && configureAdornment(endAdornment, 'after', lang || 'ar')};
  ${({ hover }) => hover && configureHover(hover)};
  ${({ direction }) =>
    direction &&
    css`
      direction: ${direction};
    `};
  ${({ uppercase }) =>
    uppercase &&
    css`
      &:lang(en) {
        text-transform: uppercase;
      }
    `}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `}
`;

export default StyledText;
