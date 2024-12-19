import styled from '@emotion/styled';

import images from '@/assets/images';

const Wrapper = styled('div')`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${images.SCREEN_BG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default Wrapper;
