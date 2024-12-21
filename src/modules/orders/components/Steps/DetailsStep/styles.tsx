import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: refund-details-wrapper;
  .logo {
    label: product-logo;
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 6px;
    ${({ theme }) => css`
      background: ${theme.colors.shades[300]};
    `}
    &--order {
      position: absolute;
      top: -10px;
      left: -5px;
      width: 24px;
      height: 24px;
      border-radius: 100px;
      ${({ theme }) => css`
        border: 4px solid ${theme.colors.shades[100]};
        background: ${theme.pallet.primary[500]};
      `}
      ${devices.md} {
        width: 32px;
        height: 32px;
      }
      ${devices.lg} {
        width: 45px;
        height: 45px;
      }
    }
    &--image {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
    ${devices.md} {
      width: 100px;
      height: 100px;
      border-radius: 8px;
    }
    ${devices.lg} {
      width: 140px;
      height: 140px;
      border-radius: 10px;
    }
    ${devices.xl} {
      width: 180px;
      height: 180px;
    }
  }
  .shipping--logo {
    label: shipping-logo;
    width: 54px;
    height: 32px;
    border-radius: 6px;
    ${({ theme }) => css`
      background: ${theme.colors.shades[200]};
    `}
    &__image {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
    ${devices.md} {
      width: 80px;
      height: 50px;
    }
  }
  .refund--paper {
    label: refund-paper;
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.shades[300]};
    `}
    border-radius: 6px;
    ${devices.md} {
      border-radius: 8px;
    }
    ${devices.lg} {
      border-radius: 10px;
    }
  }
  .terms--button {
    all: unset;
    cursor: pointer;
    &:hover {
      p {
        text-decoration: underline;
      }
    }
  }
`;

export default Wrapper;
