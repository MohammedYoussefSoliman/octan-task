import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { UIActionsState, SnackbarType } from '../types';

export type AuthMode = 'modal' | 'page';

const initialState: UIActionsState = {
  snackbar: {
    message: null,
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    status: 'info',
    type: 'normal',
  },
  modals: [],
  localStep: 0,
  orderCheckAuth: 'natural',
  authMode: 'page',
};

const messageReducer = (
  state: UIActionsState,
  action: PayloadAction<SnackbarType>,
) => {
  state.snackbar = {
    ...state.snackbar,
    ...action.payload,
  };
};

const slice = createSlice({
  name: 'app/ui-actions',
  initialState,
  reducers: {
    showMessage: {
      reducer: messageReducer,
      prepare: (message: string, options?: Omit<SnackbarType, 'message'>) => {
        let payload = { ...initialState.snackbar };
        if (!_.isEmpty(options)) {
          payload = { ...payload, ...options };
        }
        payload = { ...payload, message };
        return { payload };
      },
    },
    showError: {
      reducer: messageReducer,
      prepare: (message: string, type?: UIActionsState['snackbar']['type']) => {
        return {
          payload: {
            ...initialState.snackbar,
            message,
            status: 'failure' as 'success' | 'failure' | 'info',
            type: type || 'normal',
            autoHideDuration: type === 'normal' ? 5000 : undefined,
          },
        };
      },
    },
    showSuccess: {
      reducer: messageReducer,
      prepare: (message: string, type?: UIActionsState['snackbar']['type']) => {
        return {
          payload: {
            ...initialState.snackbar,
            message,
            status: 'success' as 'success' | 'failure' | 'info',
            type: type || 'normal',
            autoHideDuration: type === 'normal' ? 5000 : undefined,
          },
        };
      },
    },
    openModal(state: UIActionsState, action: PayloadAction<string>) {
      return {
        ...state,
        modals: [...state.modals, action.payload],
      };
    },
    modalOverride(state: UIActionsState, action: PayloadAction<string[]>) {
      return {
        ...state,
        modals: [...action.payload],
      };
    },
    updateOrderCheckAuth(
      state: UIActionsState,
      action: PayloadAction<UIActionsState['orderCheckAuth']>,
    ) {
      return {
        ...state,
        orderCheckAuth: action.payload,
      };
    },
    closeModal(state: UIActionsState, action: PayloadAction<string>) {
      const currentShownModals = state.modals.filter(
        (modal) => modal !== action.payload,
      );
      return {
        ...state,
        modals: [...currentShownModals],
      };
    },
    dismissMessage(state) {
      return { ...state, snackbar: initialState.snackbar };
    },
    handleNextStep(state: UIActionsState) {
      return { ...state, localStep: state.localStep + 1 };
    },
    handleBackStep(state: UIActionsState) {
      if (state.localStep >= 1) {
        return { ...state, localStep: state.localStep - 1 };
      }
      return state;
    },
    setActiveStep(state: UIActionsState, action: PayloadAction<number>) {
      return { ...state, localStep: action.payload };
    },
    setAuthMode(state, action: PayloadAction<UIActionsState['authMode']>) {
      return { ...state, authMode: action.payload };
    },
  },
});

export const {
  showMessage,
  showError,
  showSuccess,
  dismissMessage,
  openModal,
  closeModal,
  handleNextStep,
  handleBackStep,
  setActiveStep,
  modalOverride,
  updateOrderCheckAuth,
  setAuthMode,
} = slice.actions;
export default slice.reducer;
