import { createSlice } from "@reduxjs/toolkit";

type OpenState = {
  value:boolean
};

const initialState = {
  value: false,
} as OpenState;

export const open = createSlice({
  name: "swich",
  initialState,
  reducers: {
    openitem: (state) => {
      state.value = true
    },
    closeitem: (state) => {
      state.value = false;
    },
  },
});

export const {
  openitem,
  closeitem,
} = open.actions;
export default open.reducer;