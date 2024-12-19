import { css } from '@emotion/react';

const styledText = (
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  size: number | string,
) => css`
  font-weight: ${weight};
  font-size: ${size}px;
`;

export default styledText;
