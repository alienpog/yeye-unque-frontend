import { createSlice } from "@reduxjs/toolkit";

type OpenState = {
  value:boolean
};

const initialState = {
  value: false,
} as OpenState;

export const adminvendor = createSlice({
  name: "vendorswich",
  initialState,
  reducers: {
    openvendor: (state) => {
      state.value = true
    },
    closevendor: (state) => {
      state.value = false;
    },
  },
});

export const {
    openvendor,
    closevendor,
} = adminvendor.actions;
export default adminvendor.reducer;