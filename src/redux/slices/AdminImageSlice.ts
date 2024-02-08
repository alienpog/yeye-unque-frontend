import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
    value:{
        productimage:string;
        vendorimage?:string;
        vendorname?:string;
        vendorphonenumber?:number;
        vendorprice:number;
        vendorloction?:string;
      }
};

const initialState = {
    value:{},
} as ProductState;

export const vendor = createSlice({
  name: "adminvendorproduct",
  initialState,
  reducers: {
    adminopenVendor: (state, action : PayloadAction<any>) => {
        const productimage = action.payload.productimage
        const vendorimage = action.payload.vendorimage
        const vendorname = action.payload.vendorname
        const vendorphonenumber = action.payload.vendorphonenumber
        const vendorprice = action.payload.vendorprice
        const vendorloction = action.payload.vendorloction
        state.value = {
            productimage: productimage,
            vendorimage: vendorimage,
            vendorname: vendorname,
            vendorphonenumber: vendorphonenumber,
            vendorprice:vendorprice,
            vendorloction: vendorloction
        }
    },
  },
});

export const {
  adminopenVendor,
} = vendor.actions;
export default vendor.reducer;