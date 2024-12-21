import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';

const Calculator = styled(Flex)`
  position: relatives !important;
  width: 100%;
`;

const CalculatorCard = styled(Flex)<{
  variant?: 'light' | 'dark';
  position?: 'right' | 'left';
  zIndex?: number;
}>`
  position: absolute;
  background: ${({ theme, variant }) =>
    variant === 'light'
      ? theme.pallet.primary[100]
      : theme.pallet.primary[500]};
  border-radius: 32px;
  left: 50%;
  ${devices.md} {
    left: ${({ position }) => (position === 'left' ? '40%' : '60%')};
  }
  margin-top: ${({ position }) => (position === 'left' ? '-400px' : '280px')};
  ${devices.md} {
    margin-top: ${({ position }) => (position === 'left' ? 'auto' : '3%')};
  }
  transform: translateX(-50%);
  z-index: ${(props) => props?.zIndex || 1} !important;
  overflow: hidden;
`;

const CalcFlex = styled(Flex)`
  background: transparent !important;
`;

export { Calculator, CalculatorCard, CalcFlex };
