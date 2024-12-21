import { CSSProperties } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Paper, Flex } from '@/components';
import { StatusStep } from '@/components/StatusStepper/types';
import * as themeColors from '@/theme/colors';
import devices from '@/theme/sizes';

type ItemPaperType = {
  disabled?: boolean;
};

export const ItemCard = styled(Flex)<ItemPaperType>`
  label: item-wrapper;
  min-width: 100%;
  border-radius: 16px;

  ${devices.md} {
    min-width: 250px;
  }
  ${({ theme: { pallet, colors, branding }, disabled }) => css`
    background-color: ${disabled
      ? colors.shades[400]
      : branding.isEnabled
        ? colors.shades[100]
        : pallet.primary[50]};
    outline: 1px solid
      ${disabled
        ? 'transparent'
        : branding.isEnabled
          ? colors.shades[500]
          : pallet.primary[200]};
  `}
  .item--details {
    padding-bottom: 20px;
    ${({ theme, disabled }) => css`
      border-bottom: ${disabled
        ? 'none'
        : `1px solid ${theme.colors.grey[100]}`};
    `}
  }
  .address-wrapper {
    ${({ theme }) => css`
      background-color: ${theme.colors.shades[100]};
      border-radius: 10px;
    `}
  }
`;

type PackagePaperType = {
  disabled?: boolean;
};

export const PackagePaper = styled(Paper)<PackagePaperType>`
  label: package-wrapper;
  min-width: 100%;
  ${devices.md} {
    min-width: 250px;
  }
  ${({ theme: { pallet, colors, branding }, disabled }) => css`
    background-color: ${
      disabled
        ? colors.shades[300]
        : branding.isEnabled
          ? colors.shades[100]
          : pallet.primary[50]
    };
}
    .package-item-wrapper {
      &:hover {
        outline: ${disabled ? 'none' : `1px solid ${pallet.primary[400]}`};
      }
      background-color: ${disabled ? colors.shades[500] : pallet.primary[100]};
    }
  `}
`;

export const AmountWrapper = styled(Flex)`
  ${({ theme: { pallet, branding } }) => css`
    background-color: ${branding.secondaryColor ?? pallet.primary[50]};
    border-radius: 10px;
  `}
`;
export const AddressWrapper = styled(Flex)`
  ${({ theme }) => css`
    background-color: ${theme.colors.shades[200]};
    border-radius: 10px;
  `}
`;

export const OrderBadge = styled.div<{ isBranded: boolean }>`
  label: order-badge;
  padding: 6px 10px;
  border-radius: 10px;
  ${({ theme, isBranded }) => css`
    background: ${isBranded
      ? theme.colors.shades[400]
      : theme.pallet.primary[100]};
  `}
`;

export const AddressesList = styled(Flex)`
  max-height: 100px;
  overflow-y: auto;
  .address--button {
    all: unset;
    width: 100%;
    border-radius: 6px;
    padding: 8px;
    cursor: pointer;
    ${({ theme }) => css`
      background-color: ${theme.pallet.primary[50]};
      &:enabled:hover {
        outline: 1px solid ${theme.pallet.primary[400]};
      }
      &:disabled {
        background-color: ${theme.colors.grey[100]};
        cursor: not-allowed;
      }
    `}
    ${devices.md} {
      padding: 16px;
    }
  }
  ${devices.md} {
    max-height: 400px;
  }
`;

export const LocationButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  ${({ theme }) => css`
    background-color: ${theme.pallet.primary[50]};
    &:hover {
      outline: 1px solid ${theme.pallet.primary[400]};
    }
  `}
  ${devices.md} {
    padding: 16px;
  }
`;

export const TotalAmountWrapper = styled(Flex)`
  border-radius: 12px;
  padding: 16px 24px;
  ${({ theme: { pallet, branding } }) => css`
    border: 1px dashed ${branding.primaryColor ?? pallet.primary[400]};
    background-color: ${branding.secondaryColor ?? pallet.primary[50]};
  `}
  ${devices.md} {
    border-radius: 20px;
    padding: 30px;
  }
`;

export const WarningWrapper = styled(Flex)`
  max-width: 679px;
  border-radius: 12px;
  padding: 8px 16px;
  ${({ theme }) => css`
    border: 2px dashed ${theme.colors.red[700]};
    background-color: ${theme.colors.red[100]};
  `}
  p {
    display: inline;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const AddressesWrapper = styled(Flex)`
  label: addresses-wrapper;
  overflow-y: auto;
  max-height: 400px;
`;

type BoxWrapperType = {
  background: CSSProperties['color'];
  color: CSSProperties['color'];
};

export const BoxWrapper = styled(Flex)<BoxWrapperType>`
  label: box-wrapper;
  border-radius: 7px;
  ${({ background, color }) => css`
    background-color: ${background};
    border: 1px solid ${color};
  `}
  ${devices.md} {
    border-radius: 10px;
  }
`;

type StatusDescriptionWrapperType = {
  state?: StatusStep['state'] | 'current';
};

const statusColors = {
  passed: css`
    .text {
      color: ${themeColors.purple[500]};
    }
    background-color: ${themeColors.purple[50]};
  `,
  success: css`
    .text {
      color: ${themeColors.text.success};
    }
    background-color: ${themeColors.green[100]};
  `,
  mixed: css`
    .text {
      color: ${themeColors.yellow[700]};
    }
  `,
  current: css`
    .text {
      color: ${themeColors.orange[700]};
    }
    background-color: ${themeColors.orange[100]};
  `,
  failure: css`
    .text {
      color: ${themeColors.text.error};
    }
    background-color: ${themeColors.red[100]};
  `,
};

export const StatusDescriptionWrapper = styled(
  Flex,
)<StatusDescriptionWrapperType>`
  label: box-wrapper;
  border-radius: 7px;
  ${devices.md} {
    border-radius: 10px;
  }
  ${({ state }) => state && statusColors[state]}
`;

export const AttachmentsWrapper = styled(Flex)`
  width: 100%;
  border-radius: 12px;
  padding: 16px 24px;
  ${({ theme: { pallet, branding } }) => css`
    border: 1px solid ${branding.primaryColor ?? pallet.primary[200]};
    background-color: transparent;
  `}
  ${devices.md} {
    border-radius: 20px;
    padding: 30px;
  }
  .item--info {
    ${({ theme: { pallet, branding } }) => css`
      border-bottom: 1px solid ${branding.primaryColor ?? pallet.primary[200]};
    `}
  }
  .reason--wrapper {
    border-radius: 10px;
    ${({ theme }) => css`
      background-color: ${theme.colors.shades[400]};
    `}
  }
`;
export const AllAttachmentsWrapper = styled(Flex)`
  label: allAtt-wrapper;
  .form {
    width: 100%;
  }
`;
export const NoCarriersWrapper = styled(Flex)`
  ${({ theme }) => css`
    background-color: ${theme.colors.blue[100]};
    border: 1px solid ${theme.colors.blue[500]};
    border-radius: 10px;
  `}
`;

export const OTPVerificationWrapper = styled(Flex)`
  ${({ theme }) => css`
    background-color: ${theme.colors.orange[100]};
    border: 1px solid ${theme.colors.orange[500]};
    border-radius: 10px;
  `}
`;

export const SingleCarrierWrapper = styled(Flex)`
  ${({ theme }) => css`
    background-color: ${theme.colors.shades[100]};
    border: 1px solid ${theme.colors.shades[500]};
    border-radius: 10px;
    width: 100%;
    padding: 1rem;
  `}
`;

export const StyledGalleryButton = styled('button')(
  ({ theme }) => css`
    all: unset;
    position: relative;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${theme.colors.grey[400]};
    cursor: pointer;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-image: linear-gradient(
        0deg,
        ${theme.colors.purple[900]} 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
);

export const GalleryCountWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const ItemStatus = styled(Flex)<{ status: 'success' | 'error' }>`
  ${({ theme, status }) => css`
    background-color: ${status === 'success'
      ? theme.colors.green[500]
      : theme.colors.red[600]};
    border-radius: 14px;
    padding: 8px 14px;
  `}
`;
