import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex } from "components/Grids";
import devices from "theme/sizes";

const Wrapper = styled(Flex)<{ disabled?: boolean }>`
  label: counter-wrapper;
  ${({ theme, disabled }) => css`
    border: 1px solid ${theme.colors.grey[300]};
    background-color: ${disabled
      ? theme.colors.shades[400]
      : theme.colors.shades[100]};
  `}
  border-radius: 6px;
  padding: 8px;
  gap: 16px;
  ${devices.sm} {
    border-radius: 10px;
    padding: 10px;
    gap: 22px;
  }
  ${devices.md} {
    padding: 12px;
  }
`;

export const Button = styled.button`
  label: counter-button;
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    ${({ theme }) => css`
      background-color: ${theme.pallet.primary[50]};
    `}
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
    }
  }
  ${devices.sm} {
    width: 32px;
    height: 32px;
  }
  ${devices.md} {
    width: 36px;
    height: 36px;
  }
  ${devices.lg} {
    width: 40px;
    height: 40px;
  }
`;

export default Wrapper;
