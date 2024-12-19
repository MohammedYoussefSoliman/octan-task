import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

const Wrapper = styled.div`
  label: avatar;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 200px;
  overflow: hidden;
  padding-bottom: 3px;
  ${({ theme }) => css`
    background-color: ${theme.pallet.primary[500]};
  `}
  ${devices.md} {
    width: 46px;
    height: 46px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Wrapper;
