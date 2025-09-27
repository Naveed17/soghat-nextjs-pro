import { RootState } from "../store";

export const darkMode = (state: RootState) => state.root.isDarkMode;
export const themeMode = (state: RootState) => state.root.mode;
export const openFilterListing = (state: RootState) =>
  state.root.openFilterListing;
export const openDrawerListing = (state: RootState) =>
  state.root.openDrawerListing;
