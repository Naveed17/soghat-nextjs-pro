import { createAction } from "@reduxjs/toolkit";
export const setCart = createAction("cart/setCart");
export const setTotal = createAction("cart/setTotal");
export const setDiscount = createAction("cart/setDiscount");
export const setFreight = createAction("cart/setFreight");
export const setNetTotal = createAction("cart/setNetTotal");
export const resetCart = createAction("cart/resetCart");
