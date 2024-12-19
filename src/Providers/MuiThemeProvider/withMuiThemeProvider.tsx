import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});
export function withMuiThemeProvider<T extends object>(
  WrappedComponent: React.ComponentType<T>,
) {
  function ThemeWrapper(props: T) {
    return (
      <ThemeProvider theme={theme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  }

  return ThemeWrapper;
}
