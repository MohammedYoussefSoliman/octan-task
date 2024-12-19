import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex, Paper } from '@/components';
import devices from '@/theme/sizes';

import { NotificationCardProps } from './types';

type FigureType = {
  dense?: boolean;
  status?: NotificationCardProps['status'];
};

export const Figure = styled('div')<FigureType>`
  label: media-card-figure;
  height: 72px;
  width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  ${({ theme, status }) => css`
    background: ${theme.gradients[status || 'info']};
  `}
  ${devices.lg} {
    height: 120px;
    width: 120px;
  }
  ${({ dense }) =>
    dense &&
    css`
      height: 50px !important;
      width: 50px !important;
    `}
`;

export const Wrapper = styled(Flex)`
  .heading {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    margin-bottom: 1px;
  }
  .withHeading {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
`;

export const CardContentPaper = styled(Paper)`
  ${({ theme }) => css`
    background: ${theme.pallet.primary[100]};
  `}
`;
