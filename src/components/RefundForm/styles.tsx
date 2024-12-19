import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Flex } from "components/Grids";
import devices from "theme/sizes";

const StyledRefundPaper = styled(Flex)`
  label: refund-paper;
  position: relative;
  border-radius: 16px;
  padding: 16px 24px;
  margin-top: 50px;
  width: 100%;
  ${({ theme }) => css`
    background: ${theme.gradients[6]};
  `}
  ${devices.md} {
    border-radius: 21px;
    padding: 24px 30px;
    margin-top: 0;
  }
  ${devices.lg} {
    border-radius: 24px;
  }
  ${devices.xl} {
    border-radius: 30px;
    padding: 30px 50px;
  }
  .title {
    margin-top: 16px;
    ${devices.md} {
      margin-top: 24px;
    }
    ${devices.xl} {
      margin-top: 30px;
    }
  }
  .sticker {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
`;

export const Figure = styled.div`
  label: refund-paper-figure;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;

  ${({ theme }) => css`
    background: ${theme.gradients.info};
  `}
  ${devices.md} {
    height: 70px;
    width: 70px;
  }
  ${devices.lg} {
    height: 80px;
    width: 80px;
  }
  ${devices.xl} {
    height: 100px;
    width: 100px;
  }
`;

export default StyledRefundPaper;
