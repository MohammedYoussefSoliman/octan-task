import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

import { Flex } from '../../Grids';

const StyledInput = styled.input`
  height: 48px;
  width: 48px;
  border-radius: 8px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.grey[300]};
    color: ${theme.pallet.text.heading};
  `}
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  flex: 1;
  ${devices.sm} {
    width: 56px;
    height: 56px;
    font-size: 24px;
  }
  ${devices.md} {
    width: 70px;
    height: 70px;
    font-size: 30px;
  }
  ${devices.lg} {
    font-size: 36px;
  }
  ${devices.xl} {
    width: 90px;
    height: 90px;
    font-size: 48px;
  }
`;

export const Wrapper = styled(Flex)`
  &:lang(ar) {
    direction: ltr;
  }
  .otp-container {
    gap: 10px;
    ${devices.md} {
      gap: 10px;
    }
    ${devices.lg} {
      gap: 15px;
    }
    ${devices.xl} {
      gap: 20px;
    }
  }
  .otp-input {
    height: 30px !important;
    width: 30px !important;
    border-radius: 8px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.grey[400]};
      color: ${theme.pallet.text.heading};
    `}
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    flex: 1;
    ${devices.sm} {
      width: 45px !important;
      height: 45px !important;
      font-size: 24px;
    }
    ${devices.md} {
      width: 70px !important;
      height: 70px !important;
      font-size: 30px;
    }
    ${devices.lg} {
      font-size: 36px;
    }
    ${devices.xl} {
      width: 90px !important;
      height: 90px !important;
      font-size: 48px !important;
    }
    &:focus {
      ${({ theme }) => css`
        outline: 2px solid ${theme.pallet.primary[600]};
      `}
    }
  }
  .otp-input-error {
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.error[300]};
      background: ${theme.colors.error[100]};
    `}
  }
`;

export default StyledInput;
