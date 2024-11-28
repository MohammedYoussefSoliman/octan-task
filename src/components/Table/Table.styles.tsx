import { css } from '@emotion/react';
import styled from '@emotion/styled';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const { screens } = defaultTheme;

type WrapperType = {
  headless?: boolean;
};

export const TableWrapper = styled('div')<WrapperType>`
  overflow-x: auto;
  max-width: 100%;
  ${({ headless }) =>
    headless &&
    css`
      width: 100%;
    `}
  max-height: 100%;
  overflow-y: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;

  tr td {
    border-bottom: none;
  }
  thead tr th {
    position: sticky;
    top: -1px;
    padding: 6px;
    border-top: 1px solid ${colors.indigo[100]};
    border-bottom: 1px solid ${colors.indigo[100]};
    background-color: ${colors.indigo[50]};
    &:first-of-type {
      padding-inline-start: 10px;
      border-radius: 12px 0 0 12px;
      &:lang(ar) {
        border-radius: 0 12px 12px 0;
        border-right: 1px solid ${colors.indigo[100]};
      }
      &:lang(en) {
        border-left: 1px solid ${colors.indigo[100]};
      }
      ${screens.md} {
        border-radius: 16px 0 0 16px;
        &:lang(ar) {
          border-radius: 0 16px 16px 0;
        }
      }
      ${screens.lg} {
        padding-inline-start: 16px;
      }
    }
    &:last-of-type {
      padding-inline-end: 10px;
      border-radius: 0 12px 12px 0;
      &:lang(ar) {
        border-radius: 12px 0 0 12px;
        border-left: 1px solid ${colors.indigo[100]};
      }
      ${screens.md} {
        border-radius: 0 16px 16px 0;
        &:lang(ar) {
          border-radius: 16px 0 0 16px;
        }
      }
      ${screens.lg} {
        padding-inline-start: 16px;
      }
    }
    ${screens.md} {
      padding: 10px;
    }
  }
  tbody {
    tr td {
      padding: 6px;
      ${() => css`
        border-bottom: 1px solid ${colors.neutral[200]};
        background-color: ${colors.white};
      `}
      &:first-of-type {
        padding-inline-start: 10px;
        ${screens.lg} {
          padding-inline-start: 16px;
        }
      }
      &:last-of-type {
        padding-inline-end: 10px;
        ${screens.lg} {
          padding-inline-start: 16px;
        }
      }
    }
  }
`;

type CollapseTdType = {
  expand?: boolean;
};

export const CollapseTd = styled('td')<CollapseTdType>`
  padding: 0 !important;
  ${({ expand }) =>
    !expand &&
    css`
      border-bottom: none !important;
    `}
`;
