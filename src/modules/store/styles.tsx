import { css } from '@emotion/react';
import styled from '@emotion/styled';

import images from '@/assets/images';
import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: store-refund-wrapper;
  width: 100%;

  ${({
    theme: {
      branding: { backgroundImage, backgroundColor },
    },
  }) => css`
    .hero--section {
      width: 100%;
      min-height: 100vh;
      background: ${backgroundImage
        ? `url(${backgroundImage})`
        : (backgroundColor ?? `url(${images.HERO_BG})`)};
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  `}

  .store-refund {
    width: 100%;
    ${devices.md} {
      width: 600px;
    }
  }
`;

export default Wrapper;
