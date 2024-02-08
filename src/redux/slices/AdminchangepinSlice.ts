import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type OpenState = {
  value?:any;
};

const initialState = {
   value: undefined
} as OpenState;

export const prectureid = createSlice({
  name: "idswich",
  initialState,
  reducers: {
    putid: (state, action : PayloadAction<any>) => {
      const id = action.payload
      if(state.value == id) {
        state.value = undefined;
      }
      else{
        state.value = id;
      } 
    },
  },
});

export const {
    putid
} = prectureid.actions;
export default prectureid.reducer;