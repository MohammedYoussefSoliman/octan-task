import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';

export const StyledRefundCard = styled(Flex)`
  label: refund-card;
  position: relative;
  border-radius: 20px;
  padding: 16px 24px;
  margin-top: 50px;
  width: 100%;
  filter: drop-shadow(0px 0px 30px hsla(0, 0%, 0%, 0.25));
  background: rgba(255, 255, 255, 0.95);

  ${devices.md} {
    border-radius: 21px;
    padding: 24px 30px;
    margin-top: 0;
    width: 600px;
  }

  ${devices.lg} {
    border-radius: 24px;
  }

  ${devices.xl} {
    border-radius: 30px;
    padding: 30px 50px;
  }

  .title {
    margin-top: 10px;
  }
`;

export const UnbrandedLogoWrapper = styled(Flex)`
  label: unbranded-logo-wrapper;
  width: 100%;
  ${({ theme }) => css`
    background: ${theme.colors.shades[300]};
    border: 1px solid ${theme.colors.grey[300]};
    border-radius: 10px;
    padding: 10px;
  `}
`;
