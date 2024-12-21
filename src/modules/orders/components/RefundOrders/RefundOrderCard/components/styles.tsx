import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

export const RefundOrderCardLeftWrapper = styled(Flex)`
  label: refund-order-card;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.grey[100]};
    background-color: ${theme.colors.shades[100]};
    &:hover {
      background-color: ${theme.pallet.primary[100]};
      border-color: ${theme.pallet.primary[200]};
    }
  `}
  ${devices.lg} {
    border-radius: 15px;
  }
`;

export const StyledExpandButton = styled(Flex)`
  label: expand-button;
  padding: 6px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  ${({ theme }) => css`
    background-color: ${theme.colors.shades[100]};
    &:hover {
      border-color: ${theme.pallet.primary[300]};
    }
  `}
  ${devices.md} {
    padding: 9px;
    border-radius: 10px;
  }
`;

export const StoreLogo = styled.div`
  height: 25px;
  width: 40px;
  ${devices.lg} {
    height: 40px;
    width: 62px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CardDetailsWrapper = styled(Flex)`
  .item {
    ${({ theme }) => css`
      border-bottom: 1px solid ${theme.colors.shades[400]};
    `}
    &.borderless {
      border-bottom: none;
    }
  }
  .info--wrapper {
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.shades[300]};
    `}
    border-radius: 6px;

    ${devices.md} {
      border-radius: 10px;
    }
  }
  .shipping--logo {
    label: shipping-logo;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    overflow: hidden;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
