import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: fallback-wrapper;
  height: unset;
  ${devices.md} {
    height: 100vh;
  }
  width: 100%;
  .content {
    flex-direction: column;
    width: 100%;
    &--paper {
      width: 100%;
      max-height: 370px;
    }
    ${devices.md} {
      flex-direction: row;
      &--paper {
        max-height: unset;
      }
    }
  }
`;

export default Wrapper;
