import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '@/components/Buttons';
import { Flex } from '@/components/Grids';

const LoginButton = styled(Button)`
  width: 180px;
`;

const LoginButtonContainer = styled.div`
  position: relative;
`;

const slideDown = keyframes`
 from { transform: translateY(-20%); opacity: 0; scale: 0}
 to { transform: translateY(0); opacity: 1; scale: 1}
`;

const slideUp = keyframes`
  from { transform: translateY(0); opacity: 1; scale: 1}
  to  {transform: translateY(-20%); opacity: 0; scale: 0}
`;

const LoginCard = styled(Flex)<{
  state: 'show' | 'hide';
}>`
  position: absolute;
  display: flex;
  gap: 8px;
  left: 0;
  top: 120%;
  background-color: white;
  border-radius: 20px;
  padding: 8px;
  width: 220px;
  animation-duration: 300ms;
  animation-fill-mode: both;
  transform-origin: top center;
  ${({ state }) =>
    state === 'show'
      ? css`
          animation-name: ${slideDown};
        `
      : css`
          animation-name: ${slideUp};
        `}
`;

type LoginCardButtonType = {
  variant?: 'light' | 'dark';
};

const LoginCardButton = styled(Button)<LoginCardButtonType>`
  border-radius: 12px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 1;
  gap: 8px;
  padding: 4px !important;
  height: 80px !important;
  background-color: ${({ theme, variant }) =>
    variant === 'light'
      ? theme.pallet.primary[100]
      : theme.pallet.primary[500]};
  width: calc(110px - 12px);
`;

export { LoginButton, LoginButtonContainer, LoginCard, LoginCardButton };
