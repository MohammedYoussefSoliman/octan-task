import { css } from "@emotion/react";
import styled from "@emotion/styled";
import devices from "theme/sizes";

const StyledFigure = styled("figure")`
  label: figure;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 135px;
  border-radius: 10px;
  overflow: hidden;
  padding: 6px;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.shades[400]};
  `}
  ${devices.md} {
    width: 300px;
    height: 270px;
    padding: 16px;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default StyledFigure;
