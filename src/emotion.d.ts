/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@emotion/react';
import { ThemeType } from './theme/types';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
