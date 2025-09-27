import { createReducer } from "@reduxjs/toolkit";
import { setWishlist, fetchWishlist } from "./actions";
export interface CartState {
  wishlist: any[];
}
const initialState: CartState = {
  wishlist: [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setWishlist, (state, action: any): any => {
      state.wishlist = action.payload;
    })
    .addCase(fetchWishlist.fulfilled, (state, action: any): any => {
      state.wishlist = action.payload;
    });
});
