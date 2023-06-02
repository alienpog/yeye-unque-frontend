import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import openReducer from "./slices/openSlice";
import loginReducer from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    productReducer,
    openReducer,
    loginReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;