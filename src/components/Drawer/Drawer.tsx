import React from 'react';

import { Drawer as MuiDrawer } from '@mui/material';

import { Flex, IconButton, Logo } from '@/components';
import { useBreakpoints } from '@/hooks';
import { withThemeProvider, withMuiThemeProvider } from '@/Providers';

type Props = {
  open: boolean;
  onClose: () => void;
  anchor?: 'top' | 'left' | 'bottom' | 'right';
  children: React.ReactNode;
  withHeader?: boolean;
};

type ContentProps = {
  children: React.ReactNode;
};

function ContentComponent({ children }: ContentProps) {
  return <div>{children}</div>;
}

const Content = withThemeProvider<ContentProps>(ContentComponent);

function Drawer({
  open,
  onClose,
  children,
  anchor = 'top',
  withHeader = true,
}: Props) {
  const { large, xxLarge } = useBreakpoints();

  return (
    <MuiDrawer anchor={anchor} open={open} onClose={onClose}>
      <Flex
        p="24px"
        direction="column"
        gap={{ xs: 8, md: 16, lg: 32 }}
        fullWidth
      >
        {withHeader && (
          <Flex
            direction="row-reverse"
            align="center"
            justify="space-between"
            fullWidth
          >
            <IconButton
              icon="times"
              iconSize={24}
              variant="transparent"
              onClick={onClose}
            />
            <Logo color="colored" size={xxLarge ? 144 : large ? 120 : 100} />
          </Flex>
        )}
        <Content>{children}</Content>
      </Flex>
    </MuiDrawer>
  );
}

export default withMuiThemeProvider<Props>(Drawer);
