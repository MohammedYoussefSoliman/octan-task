import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import * as themeColors from '@/theme/colors';
import devices from '@/theme/sizes';

import { StatusStep } from './types';

type OrderStatus = {
  orderState: StatusStep['state'] | 'current';
};
type StateWrapperType = OrderStatus & {
  negativeMargin: number;
};

const statusColors = {
  passed: css`
    .label {
      color: ${themeColors.purple[500]};
    }
    .status {
      background-color: ${themeColors.purple[50]};
    }
    &.separator--status {
      background-color: ${themeColors.purple[200]};
    }
  `,
  success: css`
    .label {
      color: ${themeColors.text.success};
    }
    .status {
      background-color: ${themeColors.green[100]};
    }
    &.separator--status {
      background-color: ${themeColors.green[200]};
    }
  `,
  mixed: css`
    .label {
      color: ${themeColors.yellow[700]};
    }
    .status,
    &.separator--status {
      background-color: ${themeColors.yellow[300]};
    }
  `,
  current: css`
    .label {
      color: ${themeColors.orange[700]};
    }
    .status {
      background-color: ${themeColors.orange[100]};
    }
    &.separator--status {
      background-color: ${themeColors.orange[300]};
    }
  `,
  failure: css`
    .label {
      color: ${themeColors.text.error};
    }
    .status {
      background-color: ${themeColors.red[100]};
    }
    &.separator--status {
      background-color: ${themeColors.red[300]};
    }
  `,
};

const resolveStepStatus = (state: StatusStep['state'] | 'current') => {
  if (!state) {
    return css`
      .label {
        color: ${themeColors.text.body};
      }
      .status,
      &.separator--status {
        background-color: ${themeColors.grey[100]};
      }
    `;
  }
  return statusColors[state];
};

export const Wrapper = styled(Flex)`
  label: status-stepper-wrapper;
  align-self: center;
`;

export const StepperSeparator = styled('div')<OrderStatus>`
  label: status-stepper-separator;
  height: 20px;
  width: 2px;
  ${({ orderState }) => resolveStepStatus(orderState)}
  ${devices.md} {
    flex: 1;
    height: 2px;
    margin-top: 1rem;
  }
`;

export const StateWrapper = styled(Flex)<StateWrapperType>`
  label: status-state-wrapper;
  ${({ orderState }) => resolveStepStatus(orderState)}
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    &--icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    ${devices.md} {
      width: 50px;
      height: 50px;
      &--icon {
        width: 28px;
        height: 28px;
      }
    }
    ${devices.lg} {
      width: 70px;
      height: 70px;
      &--icon {
        width: 32px;
        height: 32px;
      }
    }
  }
  ${({ negativeMargin }) =>
    negativeMargin &&
    css`
      margin-left: -${negativeMargin}px;
      margin-right: -${negativeMargin}px;
    `}
`;
