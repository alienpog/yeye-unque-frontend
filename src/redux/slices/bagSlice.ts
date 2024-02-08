import { PayloadAction, createSlice, } from "@reduxjs/toolkit";


// if (!localStorage.getItem("cartofyeyeunique")){
//   localStorage.setItem("cartofyeyeunique",'{"items":[], "totalquantity":0}');   


type CartState = {
  cart:{
    items:any[],
    totalquantity:number,
  }
};

 // @ts-ignore
// const itemlists = JSON.parse(localStorage.getItem("cartofyeyeunique")); 

const initialState = {
  cart:{
    items:[], 
    totalquantity:0}
  
} as CartState;


export const bag = createSlice({
  name: "cartitems",
  initialState,
  reducers: {
    addproduct: (state, action: PayloadAction<any>) => {
      const id =action.payload.id;
      const name =action.payload.name;
      const image = action.payload.image;
      const price = action.payload.price;
      const measurement = action.payload.measurement;
      const excitingitem = state.cart.items?.find(item => item?.id === id);
      if (excitingitem) {
        excitingitem.quantity ++;
        excitingitem.subprice += price;
        state.cart.totalquantity++;
      }else{
        state.cart.items?.push({
          id: id,
          name: name,
          image: image,
          price: price,
          subprice: price,
          measurement: measurement,
          quantity: 1,
        }),
        state.cart.totalquantity++
      }
    },
    minusproduct: (state, action: PayloadAction<any>) => {
      const id =action.payload.id;
      const price = action.payload.price
      const excitingitem = state.cart.items?.find(item => item?.id === id);
      if(excitingitem.quantity === 1){
        state.cart.items = state.cart.items?.filter(item => item.id !== id);
        state.cart.totalquantity--
      }else{
        excitingitem.quantity--;
        excitingitem.subprice -= price
        state.cart.totalquantity--
      }
    },
    removeproduct: (state, action: PayloadAction<any>) => {
      const id =action.payload;
      const product = state.cart.items?.find(item => item.id == id);
      if(product) {
       state.cart.totalquantity = state.cart.totalquantity - product.quantity
      }
      state.cart.items = state.cart.items?.filter(item => item.id !== id);
    },

    gettingproduct: (state, action: PayloadAction<any>) => {
      const data =action.payload
      data.map((item :any) =>{
        const excitingitem = state.cart.items?.find(data => data.id === item.id);
        if(excitingitem){
          return;
        }else{
          state.cart.items?.push({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          subprice: item.subprice,
          quantity: item.quantity,
          measurement: item.measurement

        }),
        state.cart.totalquantity+=item.quantity
        }    
      }
)},
    clearproduct: (state)=>{
      state.cart.items = []
      state.cart.totalquantity = 0
},
  },
});

export const {
  addproduct,
  minusproduct,
  removeproduct,
  gettingproduct,
  clearproduct,
} = bag.actions;
export default bag.reducer;