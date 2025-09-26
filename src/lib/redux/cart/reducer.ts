import { createReducer } from "@reduxjs/toolkit";
import {
  setCart,
  setTotal,
  setDiscount,
  setFreight,
  setNetTotal,
  resetCart,
} from "./actions";
export interface CartState {
  cart: any[];
  total: number;
  discount: number;
  freight: number;
  netTotal: number;
}
const initialState: CartState = {
  cart: [],
  total: 0,
  discount: 0,
  freight: 0,
  netTotal: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCart, (state, action: any): any => {
      state.cart = action.payload;
    })
    .addCase(setTotal, (state, action: any): any => {
      state.total = action.payload;
    })
    .addCase(setDiscount, (state, action: any): any => {
      state.discount = action.payload;
    })
    .addCase(setFreight, (state, action: any): any => {
      state.freight = action.payload;
    })
    .addCase(setNetTotal, (state, action: any): any => {
      state.netTotal = action.payload;
    })
    .addCase(resetCart, () => initialState);
});
