import React from 'react';

import { withThemeProvider, withMuiThemeProvider } from '@/Providers';

import StyledPopover from './styles';

interface Props {
  children: React.ReactNode;
  target: any;
  onClose: () => void;
}

function ContentComponent({ children }: Pick<Props, 'children'>) {
  return <div>{children}</div>;
}

const Content = withThemeProvider<Pick<Props, 'children'>>(ContentComponent);

function Component({ children, target, onClose }: Props) {
  const open = Boolean(target);

  return (
    <StyledPopover
      open={open}
      anchorEl={target}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: -10,
        horizontal: 'center',
      }}
      onClose={onClose}
    >
      <Content>{children}</Content>
    </StyledPopover>
  );
}

export const Popover = withMuiThemeProvider<Props>(Component);
