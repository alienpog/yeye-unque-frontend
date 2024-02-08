import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import openReducer from "./slices/openSlice";
import loginReducer from "./slices/loginSlice";
import cartReducer from "./slices/bagSlice";
import listReducer from "./slices/listSlice";
import couponReducer from "./slices/couponSlice";
import profileReducer from "./slices/profileslice";
import pprofileReducer from "./slices/openprofileSlice";
import vendorReducer from "./slices/AdminImageSlice";
import vvendorReducer from "./slices/AdminopenvendorSlice";
import productidReducer from "./slices/AdminchangepinSlice";
import adminloginReducer from "./slices/AdminLoginSlice";
import thankyouReducer from "./slices/thankyouSlice";

export const store = configureStore({

  reducer: {
    productReducer,
    openReducer,
    loginReducer,
    cartReducer,
    listReducer,
    couponReducer,
    profileReducer,
    pprofileReducer,
    vendorReducer,
    vvendorReducer,
    productidReducer,
    adminloginReducer,
    thankyouReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;