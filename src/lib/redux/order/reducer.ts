import { createReducer } from "@reduxjs/toolkit";
import { setOrder } from "./actions";
export interface CartState {
  order: any;
}
const initialState: CartState = {
  order: {},
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase(setOrder, (state, action: any): any => {
    state.order = action.payload;
  });
});
