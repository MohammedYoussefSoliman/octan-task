import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex } from "components/Grids";
import tinyColor from "tinycolor2";

type BankPaperType = {
  bg?: string;
};

const BankPaper = styled(Flex)<BankPaperType>`
  border-radius: 8px;
  ${({ theme, bg }) => css`
    background: ${bg
      ? tinyColor(bg).setAlpha(0.3).toString()
      : theme.pallet.primary[50]};
  `}
  .logo {
    border-radius: 5px;
    width: 70px;
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
`;

export default BankPaper;
