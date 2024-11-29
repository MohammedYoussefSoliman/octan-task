import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  showMobileAside: boolean;
};

const initialState: UIState = {
  showMobileAside: true,
};

const slice = createSlice({
  name: 'app/orders',
  initialState,
  reducers: {
    setShowMobileAside(state, action: PayloadAction<boolean>) {
      state.showMobileAside = action.payload;
    },
  },
});
export const { setShowMobileAside } = slice.actions;
export default slice.reducer;
