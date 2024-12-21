import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: dashboard-wrapper;
  height: unset;
  ${devices.md} {
    height: calc(100vh - 100px);
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
