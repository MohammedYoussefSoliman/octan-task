import { ModalProps as MuiModalProps } from '@mui/material';

import { FlexPropsType } from '@/components/Grids/Flex/types';

export interface ModalProps extends MuiModalProps {
  open: boolean;
  onClose: () => void;
  action?: React.ReactNode;
  title?: string;
  backgroundImage?: string;
  wrapperProps?: Omit<FlexPropsType, 'children'>;
  cardWidth?: FlexPropsType['width'];
  maxHeight?: string;
}

export type ConfirmModalProps = {
  heading?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (data?: any) => Promise<unknown>;
  mode?: 'attention' | 'success';
  buttonLabel?: string;
  disableEscapeKeyDown?: boolean;
};
