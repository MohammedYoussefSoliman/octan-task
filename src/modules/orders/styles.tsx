import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: orders-wrapper;
  width: 100%;
  padding: 24px 0;
  .orders--page {
    width: 100%;
    ${devices.md} {
      padding-bottom: 30px;
    }
  }
`;

export const Strong = styled.strong`
  ${({ theme: { pallet, branding } }) => css`
    color: ${branding.primaryColor ?? pallet.primary[600]};
  `}
`;

export const Anchor = styled.a`
  ${({ theme: { pallet, branding } }) => css`
    color: ${branding.primaryColor ?? pallet.primary[600]};
    font-size: 15px;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
    ${devices.md} {
      font-size: 16px;
    }
    ${devices.lg} {
      font-size: 18px;
    }
  `}
`;

export const InfoWrapper = styled(Flex)`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.shades[300]};
  `}
  border-radius: 6px;

  ${devices.md} {
    border-radius: 10px;
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

export const ItemWrapper = styled(Flex)`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.shades[400]};
  `}
  &.borderless {
    border-bottom: none;
  }
`;

export const BrandingWrapper = styled(Flex)`
  label: refund-branding-wrapper;
  width: 100%;
  min-height: calc(100vh - 80px);
  ${({ theme: { colors, branding } }) => css`
    background: ${branding.backgroundColor ?? colors.shades[400]};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
`;

export default Wrapper;
