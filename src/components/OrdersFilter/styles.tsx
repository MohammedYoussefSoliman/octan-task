import styled from "@emotion/styled";
import { Flex } from "components/Grids";
import devices from "theme/sizes";

const Wrapper = styled(Flex)`
  label: orders-filter;
  .input--wrapper {
    justify-content: flex-start;
    gap: 8px;
  }
  .filter--input {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;

    ${devices.sm} {
      display: flex;
      flex-wrap: nowrap;
      width: fit-content;
      justify-content: flex-start;
    }
    label,
    button {
      flex: 1 1 25%;
    }
  }
`;

export default Wrapper;
