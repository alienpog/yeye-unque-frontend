import { PayloadAction, createSlice, } from "@reduxjs/toolkit";

type AdminLoginState = {
  adminstatus: boolean
};

const initialState = {
  adminstatus: false
} as AdminLoginState;

export const adminlogin = createSlice({
  name: "adminloginswich",
  initialState,
  reducers: {
    adminloginset:(state, action : PayloadAction<any>)=>{
        const status = action.payload
        state.adminstatus = status
    },
    adminloginremove:(state)=>{
       state.adminstatus = false;
    }
  },
});

export const {
    adminloginset,
    adminloginremove
} = adminlogin.actions;
export default adminlogin.reducer;