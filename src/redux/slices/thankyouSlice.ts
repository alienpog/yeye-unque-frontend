import { createSlice } from "@reduxjs/toolkit";

type OpenState = {
  value:boolean
};

const initialState = {
  value: true,
} as OpenState;

export const thankyou = createSlice({
  name: "thankswich",
  initialState,
  reducers: {
    openthank: (state) => {
      state.value = true
    },
  },
});

export const {
  openthank,
} = thankyou.actions;
export default thankyou.reducer;