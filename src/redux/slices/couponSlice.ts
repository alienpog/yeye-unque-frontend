import { PayloadAction, createSlice, } from "@reduxjs/toolkit";

type LoginState = {
  value: string
};

const initialState = {
  value:""
 
} as LoginState;

export const coupon = createSlice({
  name: "couponvalue",
  initialState,
  reducers: {
    acceptaction: (state,action: PayloadAction<any>) => {
      const value = action.payload
      state.value = value
    },
    closeaction: (state) => {
        state.value=""
  },
  }
});

export const {
    acceptaction,
    closeaction,
} = coupon.actions;
export default coupon.reducer;