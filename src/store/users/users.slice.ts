import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types/common.types';

type OrdersState = {
  users: User[];
};

const initialState: OrdersState = {
  users: [],
};

const slice = createSlice({
  name: 'app/orders',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});
export const { setUsers } = slice.actions;
export default slice.reducer;
