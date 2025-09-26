import { createReducer } from "@reduxjs/toolkit";
import { fetchWebContent } from "./actions";

interface state {
  primary: string;
  textColor: string;
  websiteContent?: null | any;
  data?: null | any;
}
const initialState: state = {
  primary: "",
  textColor: "",
  websiteContent: null,
  data: null,
};

export const contentReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchWebContent.fulfilled, (state, action) => {
    state.primary = action.payload.primary;
    state.textColor = action.payload.textColor;
    state.websiteContent = action.payload.websiteContent;
    state.data = action.payload.data;
  });
});
