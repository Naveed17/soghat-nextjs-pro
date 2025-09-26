import { createAction } from "@reduxjs/toolkit";
export const setMode = createAction<string>("SET_MODE");
export const setDirection = createAction<any>("SET_DIRECTION");
export const setLocale = createAction<any>("SET_LOCALE");
export const setIsDarkMode = createAction<any>("SET_DARK");
export const setOpenFilterListing = createAction<any>(
  "SET_OPEN_FILTER_LISTING"
);
export const setOpenDrawerListing = createAction<any>(
  "SET_OPEN_DRAWER_LISTING"
);
