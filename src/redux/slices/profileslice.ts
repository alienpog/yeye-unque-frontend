import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type profileState = {
  value:{
    id?: number,
    slug?: string
    image:string;
    name:string;
    quantity:number;
    price:number;
    totalprice:number;
    delivery:string;
  }
};

const initialState = {
  value:{},
} as profileState;

export const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileset: (state,  action: PayloadAction<any>) => {
    const id = action.payload.id;
    const slug = action.payload.slug;
    const image = action.payload.image;
    const name = action.payload.name;
    const quantity = action.payload.quantity;
    const price = action.payload.price;
    const totalprice = action.payload.totalprice;
    const delivery = action.payload.delivery
      state.value = {
        id: id,
        slug: slug,
        image: image,
        name: name,
        quantity: quantity,
        price: price,
        totalprice: totalprice,
        delivery: delivery,
      }
    },
  },
});

export const {
  profileset,
} = profile.actions;
export default profile.reducer;