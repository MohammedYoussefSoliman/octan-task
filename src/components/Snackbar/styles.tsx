import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Snackbar as MaterialSnackbar } from '@mui/material';

import devices from '@/theme/sizes';

interface ContainerProps {
  status: 'success' | 'failure' | 'info';
  type: 'filled' | 'normal';
}

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !['type'].includes(prop);

export const Container = styled('div', { shouldForwardProp })<ContainerProps>`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  box-shadow: 0 20px 50px 0 rgba(55, 29, 83, 0.06);
  ${({ type }) =>
    type === 'normal'
      ? css`
          border-radius: 15px;
          padding: 8px;
          ${devices.md} {
            padding: 12px;
          }
        `
      : css`
          padding: 8px 16px;
          ${devices.md} {
            padding: 12px 24px;
          }
        `}

  ${({ theme, status, type }) => {
    const values = {
      normal: {
        info: css`
          border: 1px solid ${theme.pallet.primary[500]};
          background: ${theme.pallet.primary[100]};
          .html-content {
            * {
              color: ${theme.pallet.primary[500]};
            }
          }
        `,
        failure: css`
          border: 1px solid ${theme.colors.red[600]};
          background: ${theme.colors.shades[100]};
          .html-content {
            * {
              color: ${theme.colors.red[600]};
            }
          }
        `,
        success: css`
          border: 1px solid ${theme.colors.green[500]};
          background: ${theme.colors.shades[100]};
          .html-content {
            * {
              color: ${theme.colors.green[600]};
            }
          }
        `,
      },
      filled: {
        info: css`
          background: ${theme.pallet.primary[500]};
          .html-content {
            * {
              color: ${theme.colors.shades[100]};
            }
          }
        `,
        failure: css`
          background: ${theme.colors.red[600]};
          .html-content {
            a,
            p,
            div,
            span {
              color: ${theme.colors.shades[100]};
            }
          }
        `,
        success: css`
          background: ${theme.colors.green[500]};
          .html-content {
            a,
            p,
            div,
            span {
              color: ${theme.colors.shades[100]};
            }
          }
        `,
      },
    };
    return values[type][status];
  }}
`;

type StyledSnackbarType = {
  type: 'normal' | 'filled';
};

export const StyledSnackbar = styled(MaterialSnackbar)<StyledSnackbarType>`
  ${({ type }) =>
    type === 'normal'
      ? css`
          width: auto;
        `
      : css`
          top: 80px !important;
          left: 0 !important;
          right: 0 !important;
          width: 100%;
          & > div {
            width: 100%;
          }
        `}
`;
