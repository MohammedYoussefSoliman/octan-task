import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

export const WhatsappWrapper = styled(Flex)(
  ({ theme: { shadows, colors } }) => css`
    position: fixed;
    top: 80vh;
    left: 0;
    width: 70px;
    border-radius: 0 16px 16px 0;
    background: ${colors.shades[100]};
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px;

    box-shadow: ${shadows[3]};

    ${devices.md} {
      top: 90vh;
    }
  `,
);

export const Image = styled.img`
  object-fit: cover;
  width: 48px;
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;

  ${({ theme: { shadows } }) => css`
    box-shadow: ${shadows[1]};
  `}

  &:hover {
    transform: scale(1.02);
  }
`;
