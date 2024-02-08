import { PayloadAction, createSlice, } from "@reduxjs/toolkit"; 

type ListState = {
    list:any[]
}
;
 
const initialState = {
    list:[]
} as ListState;

export const list = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addtolist: (state, action: PayloadAction<any>) => {
      const id =action.payload.id;
      const name =action.payload.name;
      const image = action.payload.image;
      const price = action.payload.price;
      const measurement = action.payload.measurement;
      
      const excitingitem = state.list.find(item => item?.id === id);
      if (excitingitem ) {
        null
      }else{
        state.list.push({
        id: id,
        name: name,
        image: image,
        price: price,
        measurement: measurement,
      })}
    },
    removefromlist: (state, action: PayloadAction<any>) => {
        const id =action.payload;
        state.list = state.list.filter(item => item.id !== id);   
    },
    gettinglists: (state, action: PayloadAction<any>) => {
        const data =action.payload
        data.map((item :any) =>{
        const excitingitem = state.list.find(data => data.id === item.id);
        if(excitingitem){
        return;
        }else{
        state.list.push({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        measurement: item.measurement
        })
        }    
        }
  )},  
},
});

export const {
    addtolist,
    removefromlist,
    gettinglists,
  } = list.actions;
  export default list.reducer;