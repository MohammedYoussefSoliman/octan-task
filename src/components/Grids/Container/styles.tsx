import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import devices from '@/theme/sizes';

import manageContainerConfig from './mixin';
import { ConfigWidth } from './types';

type StyledContainerType = {
  width: ConfigWidth;
};

const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !['width'].includes(prop);

const Wrapper = styled('div', { shouldForwardProp })<StyledContainerType>`
  ${css`
    label: container;
  `}
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  padding-right: 12px;
  padding-left: 12px;
  width: 100%;
  ${({ width }) => width && manageContainerConfig(width)}
  ${devices.md} {
    padding-right: 24px;
    padding-left: 24px;
  }
`;

export default Wrapper;
