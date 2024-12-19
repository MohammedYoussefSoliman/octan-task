import { CSSProperties } from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

type StyledDividerType = {
  color?: CSSProperties['color'];
};

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !['color'].includes(prop);

const StyledDivider = styled(Flex, { shouldForwardProp })<StyledDividerType>`
  width: 100%;
  height: 0.6px;
  ${({ theme, color }) => css`
    background: ${color || theme.colors.grey[200]};
  `}
  ${devices.md} {
    height: 1px;
  }
`;

export default StyledDivider;
