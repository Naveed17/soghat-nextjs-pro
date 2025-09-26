import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wishList as wishListApi } from "@src/actions";
export const setWishlist = createAction("wishlist/setWishlist");

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const session = await fetch("/api/auth/session");
      const data = await session.json();
      const user = data?.user?.user ?? null;
      if (!user) return [];
      const response = await wishListApi({ user_id: user.id, action: "view" });
      return response?.wishlist || [];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
