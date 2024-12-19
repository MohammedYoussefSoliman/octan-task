import React from 'react';

import { Modal as MuiModal } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Paper, Flex, Button, H6, H4, Icon } from '@/components';
import { withThemeProvider, withMuiThemeProvider } from '@/Providers';

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
}: ContentProps) {
  const { t } = useTranslation('app');

  return (
    <Wrapper>
      <Paper
        className="confirm-modal--card"
        direction="column"
        align="center"
        justify="center"
        gap={{ xs: 16, md: 20, lg: 40 }}
      >
        <Icon
          name={mode === 'attention' ? 'attention-shape' : 'success-shape'}
          size={45}
        />
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={{ xs: 6, md: 10 }}
        >
          {heading && (
            <H4
              text={heading}
              weight={500}
              textAlign="center"
              capitalizeFirstLetter
            />
          )}
          {description && <H6 text={description} textAlign="center" />}
        </Flex>
        <Flex gap={{ xs: 16 }} fullWidth>
          <Flex flex={1}>
            <Button size="md" onClick={onClose} fullWidth>
              {t('yes')}
            </Button>
          </Flex>
          <Flex flex={1}>
            <Button size="md" onClick={call} isLoading={isLoading} fullWidth>
              {t('no')}
            </Button>
          </Flex>
        </Flex>
      </Paper>
    </Wrapper>
  );
}

const Content = withThemeProvider<ContentProps>(ContentComponent);

function ConfirmModal({
  open,
  onConfirm,
  onClose,
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
    <MuiModal open={open} onClose={onClose}>
      <div>
        <Content call={call} isLoading={loading} onClose={onClose} {...rest} />
      </div>
    </MuiModal>
  );
}

export default withMuiThemeProvider<ConfirmModalProps>(ConfirmModal);
