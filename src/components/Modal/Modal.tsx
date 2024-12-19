import { useTheme } from '@emotion/react';
import { Modal as MuiModal } from '@mui/material';

import { Card, IconButton } from '@/components';
import { withThemeProvider, withMuiThemeProvider } from '@/Providers';

import Wrapper from './styles';
import { ModalProps } from './types';

type ContentProps = Omit<ModalProps, 'open'>;

function ModalContent({
  children,
  action,
  title,
  onClose,
  wrapperProps,
  cardWidth,
  maxHeight,
}: ContentProps) {
  const { colors } = useTheme();
  return (
    <Wrapper {...wrapperProps} maxHeight={maxHeight}>
      <Card
        heading={title}
        headerAction={
          <IconButton
            size="sm"
            icon="times"
            onClick={onClose}
            variant="secondary"
            color={colors.grey[400]}
          />
        }
        width={cardWidth}
        action={action}
        className="modal--card"
      >
        <div className="modal--body">{children}</div>
      </Card>
    </Wrapper>
  );
}

const Content = withThemeProvider<ContentProps>(ModalContent);

function Modal({
  children,
  open,
  onClose,
  disableEscapeKeyDown,
  ...rest
}: ModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <div>
        <Content onClose={onClose} {...rest}>
          {children}
        </Content>
      </div>
    </MuiModal>
  );
}

export default withMuiThemeProvider<ModalProps>(Modal);
