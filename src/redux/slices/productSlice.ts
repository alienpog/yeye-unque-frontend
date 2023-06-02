import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
  value:any;
};

const initialState = {
  value: null,
} as ProductState;

export const product = createSlice({
  name: "productitems",
  initialState,
  reducers: {
    openProduct: (state, action : PayloadAction<any>) => {
      // const item.id = action.payload.id;
      // const item.images = action.payload.images
      state.value ={
        id:action.payload.id,
        images:action.payload.images
      }
    },
    closeProduct: (state) => {
      state.value = null;
    },
  },
});

export const {
  openProduct,
  closeProduct,
} = product.actions;
export default product.reducer;