import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: terms-condition;
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
