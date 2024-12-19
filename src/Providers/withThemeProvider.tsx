import React from 'react';

import { ThemeProvider } from '@emotion/react';

import getTheme from '@/theme';

export function withThemeProvider<T extends object>(
  WrappedComponent: React.ComponentType<T>,
) {
  function Wrapper(props: T) {
    return (
      <ThemeProvider theme={getTheme('light')}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  }

  return Wrapper;
}
