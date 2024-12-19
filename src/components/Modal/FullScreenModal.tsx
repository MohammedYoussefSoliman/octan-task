import { Modal as MuiModal } from '@mui/material';

import { withThemeProvider, withMuiThemeProvider } from '@/Providers';

import Wrapper from './styles';
import { ModalProps } from './types';

type ContentProps = Omit<ModalProps, 'open' | 'onClose'>;

function ModalContent({
  children,
  backgroundImage,
  wrapperProps,
}: ContentProps) {
  return (
    <Wrapper backgroundImage={backgroundImage} {...wrapperProps}>
      {children}
    </Wrapper>
  );
}

const Content = withThemeProvider<ContentProps>(ModalContent);

function Modal({
  backgroundImage,
  children,
  open,
  onClose,
  ...rest
}: ModalProps) {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Content backgroundImage={backgroundImage} {...rest}>
        {children}
      </Content>
    </MuiModal>
  );
}

export default withMuiThemeProvider<ModalProps>(Modal);
