import { createSlice, } from "@reduxjs/toolkit";

type LoginState = {
  value:boolean
};

const initialState = {
  value:false,
} as LoginState;

export const login = createSlice({
  name: "loginswich",
  initialState,
  reducers: {
    loginopen: (state) => {
      state.value = true
    },
    loginclose: (state) => {
      state.value = false;
    },
  },
});

export const {
  loginopen,
  loginclose,
} = login.actions;
export default login.reducer;