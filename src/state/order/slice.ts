/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { orderStatusesMock } from '@/helpers/orderStatusesMock';
import { CheckOrderForm, Order, ResponseMeta } from '@/helpers/types';

import {
  OrderType,
  PricingDetailsType,
  RefundReasonsType,
  ShippingDetailsType,
} from '../types';

import { getAddresses, postAddress } from './addressesServices';
import { checkOrders } from './checkOrders';
import { fetchRefundReasons } from './fetchRefundReasons';
import { getBankAccounts } from './getBankAccounts';
import { getPriceInfo } from './getPriceInfo';
import { getOrders } from './getRefundOrders';
import { postShippingCompanies } from './getShippingInfo';

type OrderState = {
  order: OrderType | null;
  refundReasons: RefundReasonsType[];
  refundOrders: {
    orders: Order[];
    meta?: ResponseMeta;
  };
  addressBook: any[];
  bankAccounts: any[];
  checkOrderFormItems: CheckOrderForm['items'];
  checkOrderStep?: number;
  orderDetails: {
    shippingDetails: ShippingDetailsType | null;
    priceDetails: PricingDetailsType | null;
  };
};

const initialState: OrderState = {
  order: null,
  refundReasons: [],
  addressBook: [],
  bankAccounts: [],
  refundOrders: {
    orders: [],
  },
  checkOrderFormItems: [],
  orderDetails: {
    shippingDetails: null,
    priceDetails: null,
  },
};

const slice = createSlice({
  name: 'app/orders',
  initialState,
  reducers: {
    setFormItems: (
      state: OrderState,
      action: PayloadAction<{ items: CheckOrderForm['items']; step?: number }>,
    ) => {
      return {
        ...state,
        checkOrderFormItems: action.payload.items,
        checkOrderStep: action.payload.step,
      };
    },
    setOrderStep: (state: OrderState, action: PayloadAction<number>) => {
      return {
        ...state,
        checkOrderStep: action.payload,
      };
    },
    flushOrder: (state: OrderState) => {
      return {
        ...state,
        order: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkOrders.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(checkOrders.rejected, (state) => {
        state.order = null;
      })
      .addCase(fetchRefundReasons.fulfilled, (state, action) => {
        state.refundReasons = action.payload.records;
      })
      .addCase(fetchRefundReasons.rejected, (state) => {
        state.refundReasons = [];
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addressBook = action.payload.records;
      })
      .addCase(getAddresses.rejected, (state) => {
        state.addressBook = [];
      })
      .addCase(postAddress.fulfilled, (state, action) => {
        state.addressBook = action.payload.records;
      })
      .addCase(postAddress.rejected, (state) => {
        state.addressBook = [];
      })
      .addCase(postShippingCompanies.fulfilled, (state, action) => {
        state.orderDetails.shippingDetails = action.payload.records;
      })
      .addCase(postShippingCompanies.rejected, (state) => {
        state.orderDetails.shippingDetails = null;
      })
      .addCase(getPriceInfo.fulfilled, (state, action) => {
        state.orderDetails.priceDetails = action.payload.records;
      })
      .addCase(getPriceInfo.rejected, (state) => {
        state.orderDetails.priceDetails = null;
      })
      .addCase(getBankAccounts.fulfilled, (state, action) => {
        state.bankAccounts = action.payload.records;
      })
      .addCase(getBankAccounts.rejected, (state) => {
        state.bankAccounts = [];
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.bankAccounts = action.payload.records;
        const preparedRefundOrders = (action.payload.records as any[])?.map(
          (order) => {
            const orderStatus = orderStatusesMock.find(
              (mockedOrder) => mockedOrder.id === order.id,
            )?.orderStatuses;
            return {
              ...order,
              orderStatus: orderStatus || [],
            };
          },
        );
        state.refundOrders.orders = preparedRefundOrders || [];
        state.refundOrders.meta = action.payload.meta;
      })
      .addCase(getOrders.rejected, (state) => {
        state.refundOrders.orders = [];
        state.refundOrders.meta = undefined;
      });
  },
});

export const { setFormItems, setOrderStep, flushOrder } = slice.actions;
export default slice.reducer;
