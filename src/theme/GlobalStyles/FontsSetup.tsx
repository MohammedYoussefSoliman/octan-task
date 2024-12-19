import { Global, css } from '@emotion/react';

import IBMPlexSans from '@/assets/fonts/IBMPlex-sans-arabic';
import OpenSans from '@/assets/fonts/open-sans';

const fontFaceGenerator = (
  name: string,
  woff: string,
  woff2: string,
  weight: number,
) => {
  return css`
    @font-face {
      font-family: ${name};
      src:
        url(${woff2}) format('woff2'),
        url(${woff}) format('woff');
      font-weight: ${weight};
    }
  `;
};

export default function FontsStyles() {
  return (
    <Global
      styles={css`
        ${OpenSans.weights.map((fontWeight) =>
          fontFaceGenerator(
            OpenSans.name,
            fontWeight.woff,
            fontWeight.woff2,
            fontWeight.weight,
          ),
        )}
        ${IBMPlexSans.weights.map((fontWeight) =>
          fontFaceGenerator(
            IBMPlexSans.name,
            fontWeight.woff,
            fontWeight.woff2,
            fontWeight.weight,
          ),
        )}
      `}
    />
  );
}
