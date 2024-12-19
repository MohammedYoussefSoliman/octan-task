import { Global, css } from '@emotion/react';

import images from '@/assets/images';
import getTheme from '@/theme';

export default function GlobalStyles() {
  const theme = getTheme('light');
  const { font } = theme;
  return (
    <Global
      styles={css`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box !important;
        }

        html {
          scroll-behavior: smooth;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }

        ul {
          list-style: none;
        }

        a {
          text-decoration: none;
          color: inherit;
          &:hover {
            text-decoration: none;
          }
        }

        img {
          display: block;
        }

        ul {
          margin: 0 !important;
        }

        body {
          font-family: ${font};
          width: 100%;
          white-space: normal;
          background-image: url(${images.BODY_BG_LIGHT});
          background-size: cover;
        }
      `}
    />
  );
}
