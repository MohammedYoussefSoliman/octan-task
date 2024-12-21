import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex, Paper } from '@/components';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: account-wrapper;
  width: 100%;
  .info-form {
    width: 100%;
  }
`;

export const List = styled(Flex)`
  max-height: 100px;
  overflow-y: auto;
  .list--button {
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

export const OutlinedPaper = styled(Paper)`
  label: outlined-paper;
  padding: 12px;
  ${devices.md} {
    padding: 12px 20px;
  }
  ${({ theme }) => css`
    outline: 1px solid ${theme.pallet.primary[400]};
  `}

  ${devices.md} {
    padding: 15px 25px;
  }

  ${devices.lg} {
    padding: 19px 30px;
  }
`;

export default Wrapper;
