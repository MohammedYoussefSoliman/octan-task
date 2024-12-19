import React from 'react';

import { useTheme } from '@emotion/react';
import { SnackbarOrigin } from '@mui/material';

import { P2, HTML, Flex, IconButton } from '@/components';
import { useAppDispatch } from '@/hooks';
import { withThemeProvider, withMuiThemeProvider } from '@/Providers';
import { dismissMessage } from '@/state';

import { Container, StyledSnackbar } from './styles';

interface SnackbarProps {
  message: string | null;
  type: 'filled' | 'normal';
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  status?: 'success' | 'failure' | 'info';
  onClose?: () => void;
  unsubscribe?: () => void;
}

type ContentProps = Omit<
  SnackbarProps,
  'duration' | 'unsubscribe' | 'anchorOrigin'
> & {
  isHtml?: boolean;
};
const htmlRegex = /<\/?[a-z][\s\S]*>/i;

function ContentComponent({
  message,
  status = 'info',
  type = 'normal',
  onClose,
  isHtml,
}: ContentProps) {
  const { colors, pallet } = useTheme();
  const color = React.useMemo(() => {
    if (status === 'failure') return colors.error[300];
    if (status === 'success') return colors.green[500];
    return pallet.primary[600];
  }, [colors, pallet, status]);

  return (
    <Container status={status} type={type}>
      <Flex
        justify="space-between"
        gap={{ xs: 6, md: 12, lg: 24 }}
        align="center"
        fullWidth
      >
        <Flex gap={{ xs: 7, md: 10, lg: 18 }}>
          {message && (
            <>{isHtml ? <HTML content={message} /> : <P2 text={message} />}</>
          )}
        </Flex>
        <IconButton
          icon="times"
          onClick={onClose}
          size="sm"
          variant="secondary"
          color={type === 'filled' ? colors.shades[100] : color}
        />
      </Flex>
    </Container>
  );
}

const Content = withThemeProvider<ContentProps>(ContentComponent);

function Snackbar({
  message,
  anchorOrigin,
  autoHideDuration,
  status = 'info',
  onClose,
  unsubscribe,
  type = 'normal',
}: SnackbarProps) {
  const [open, setOpen] = React.useState<boolean>(Boolean(message) || false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (message) setOpen(Boolean(message));
    return () => {
      if (unsubscribe) unsubscribe();
      setOpen(false);
    };
  }, [message, unsubscribe, dispatch]);

  const isHtml = React.useMemo(() => {
    if (!message) return false;
    return htmlRegex.test(message);
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    dispatch(dismissMessage());
    if (onClose) onClose();
    if (unsubscribe) unsubscribe();
  };

  return (
    <StyledSnackbar
      key={message}
      anchorOrigin={
        anchorOrigin || {
          vertical: 'top',
          horizontal: 'left',
        }
      }
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(_, reason) => {
        if (type === 'filled') {
          if (reason !== 'clickaway') handleClose();
        } else {
          handleClose();
        }
      }}
      type={type}
    >
      <div>
        <Content
          isHtml={isHtml}
          message={message}
          status={status}
          type={type}
          onClose={handleClose}
        />
      </div>
    </StyledSnackbar>
  );
}

export default withMuiThemeProvider<SnackbarProps>(Snackbar);
