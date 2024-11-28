import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Order } from '@/types/common.types';

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = {
  orders: [],
};

const slice = createSlice({
  name: 'app/orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
  },
});
export const { setOrders } = slice.actions;
export default slice.reducer;
