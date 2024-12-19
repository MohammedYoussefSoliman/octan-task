import React from 'react';

import { Modal as MuiModal } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Flex, Icon, H6, P2, Paper, Button, IconButton } from '@/components';
import { withMuiThemeProvider, withThemeProvider } from '@/Providers';

import Wrapper from './styles';
import { ConfirmModalProps } from './types';

type ContentProps = Omit<ConfirmModalProps, 'open' | 'onConfirm'> & {
  isLoading: boolean;
  call: () => Promise<any>;
};

function ContentComponent({
  heading,
  description,
  call,
  isLoading,
  onClose,
  mode = 'attention',
  buttonLabel = 'click',
}: ContentProps) {
  const { t } = useTranslation('app');

  return (
    <Wrapper>
      <Paper
        className="confirm-modal--card"
        direction="column"
        align="center"
        justify="center"
        gap={{ xs: 10, md: 20, lg: 40 }}
      >
        <Flex fullWidth>
          <IconButton
            variant="secondary"
            size="sm"
            icon="times"
            onClick={onClose}
          />
        </Flex>
        <Icon
          name={mode === 'attention' ? 'attention-shape' : 'success-shape'}
        />
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={{ xs: 6, md: 10 }}
        >
          {heading && (
            <H6
              text={heading}
              weight={500}
              textAlign="center"
              capitalizeFirstLetter
            />
          )}
          {description && <P2 text={description} textAlign="center" />}
        </Flex>
        <Button size="md" onClick={call} isLoading={isLoading} fullWidth>
          {t(buttonLabel)}
        </Button>
      </Paper>
    </Wrapper>
  );
}

const Content = withThemeProvider<ContentProps>(ContentComponent);

function ConfirmModal({
  open,
  onConfirm,
  onClose,
  disableEscapeKeyDown,
  ...rest
}: ConfirmModalProps) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const call = React.useCallback(async () => {
    setLoading(true);
    onConfirm().then(() => {
      setLoading(false);
    });
  }, [onConfirm]);

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <div>
        <Content call={call} isLoading={loading} onClose={onClose} {...rest} />
      </div>
    </MuiModal>
  );
}

export default withMuiThemeProvider<ConfirmModalProps>(ConfirmModal);
