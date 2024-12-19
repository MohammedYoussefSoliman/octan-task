import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GlobalState } from '../types';

const initialState: GlobalState = {
  message: null,
  type: 'info',
};

const slice = createSlice({
  name: 'app/globals',
  initialState,
  reducers: {
    setGlobalError(state, action: PayloadAction<GlobalState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGlobalError } = slice.actions;
export default slice.reducer;
