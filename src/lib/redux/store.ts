import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appReducer } from "./base";
import { contentReducer } from "./websiteContent/reducer";
import { wishlistReducer } from "./wishlist";
import { orderReducer } from "./order";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { cartReducer } from "./cart";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storageUpdated =
  typeof window === "undefined" ? createNoopStorage() : storage;

const persistConfig = {
  key: "root",
  storage: storageUpdated,
  whitelist: ["root", "websiteContent", "cart", "wishlist", "order"],
  blacklist: [],
};
const rootReducer = combineReducers({
  root: appReducer,
  websiteContent: contentReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
