import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';

type BankCardType = {
  gradient: 'blue' | 'purple';
};

const BankCard = styled(Flex)<BankCardType>`
  label: bank-card;
  border-radius: 6px;
  ${({ theme, gradient }) =>
    gradient === 'purple'
      ? css`
          background: ${theme.gradients[2]};
        `
      : css`
          background: ${theme.gradients[3]};
        `}
  .logo {
    border-radius: 5px;
    width: 80px;
    height: 40px;
    ${({ theme }) => css`
      background: ${theme.colors.shades[100]};
    `}
    &--image {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
  }
  .info {
    flex: 1;
    ${devices.lg} {
      &:first-of-type {
        ${({ theme }) => css`
          border-right: 1px solid ${theme.colors.shades[100]};
          &:lang(ar) {
            border-right: none;
            border-left: 1px solid ${theme.colors.shades[100]};
          }
        `}
      }
    }
  }
  ${devices.md} {
    border-radius: 10px;
  }
`;

export const AccountsWrapper = styled(Flex)`
  label: accounts-wrapper;
  overflow-y: auto;
  max-height: 400px;
`;

export default BankCard;
