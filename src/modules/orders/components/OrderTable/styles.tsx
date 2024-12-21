import { css } from '@emotion/react';
import styled from '@emotion/styled';
// import devices from "theme/sizes";

type WrapperType = {
  headless?: boolean;
};

export const TableWrapper = styled('div')<WrapperType>`
  overflow-x: auto;
  max-width: 100%;
  width: 100%;
  ${({ headless }) =>
    headless &&
    css`
      width: 100%;
    `}
`;

export const StyledTable = styled.table<{ dir: 'rtl' | 'ltr' }>`
  width: 100%;
  border-spacing: 0;
  tr td {
    border-bottom: none;
  }
  thead tr td {
    padding: 20px;
    ${({ dir, theme }) => css`
      background-color: ${theme.colors.shades[300]};
      &:first-of-type {
        padding-inline-start: 30px;
        border-radius: ${dir === 'rtl' ? '0 20px 20px 0' : '20px 0 0 20px'};
      }
      &:last-of-type {
        padding-inline-end: 30px;
        border-radius: ${dir === 'rtl' ? '20px 0 0 20px' : '0 20px 20px 0'};
      }
    `}
  }
  tbody {
    tr td {
      padding: 30px;
      ${({ theme }) => css`
        border-bottom: 1px solid ${theme.colors.grey[100]};
      `}
    }
    tr td:last-child,
    tr td:first-of-type {
      padding: 30px;
    }
    tr:last-of-type td {
      border-bottom: none;
    }
  }
`;
