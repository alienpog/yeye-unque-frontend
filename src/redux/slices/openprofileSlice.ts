import { createSlice } from "@reduxjs/toolkit";

type OpenState = {
  value:boolean
};

const initialState = {
  value: false,
} as OpenState;

export const profile = createSlice({
  name: "profileswich",
  initialState,
  reducers: {
    openprofile: (state) => {
      state.value = true
    },
    closeprofile: (state) => {
      state.value = false;
    },
  },
});

export const {
  openprofile,
  closeprofile,
} = profile.actions;
export default profile.reducer;