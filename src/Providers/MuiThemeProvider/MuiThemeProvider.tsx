import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Props {
  children: React.ReactNode;
}

export function MuiThemeProvider({ children }: Props) {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
