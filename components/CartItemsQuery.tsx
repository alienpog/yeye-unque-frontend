"use client"

import BACKEND_URL from "@/src/apiConfig";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { gettingproduct } from "@/src/redux/slices/bagSlice";
import { RootState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

interface Data {
  id?: string;
  name?: string;
  image?: string;
  quantity?: number;
  price?:number;
  dollar?: number;
  subprice?: number;
}

function CartItemsQuery() {
  
// sessions from Google
const { data : session }= useSession();  

const dispatch = useAppDispatch(); 
const cart = useAppSelector((state :RootState) => state.cartReducer.cart);

// usestate in usestate 
const [data, setData] = useState([])
// get on first load
useEffect(() =>{
  
  async function QueryData(){
    
    const res= await fetch(`${BACKEND_URL}gettingitems/`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({"email": session?.user?.email}
        ),
    })
    const data = await res.json()
    if(data.length > 0) {
      dispatch(gettingproduct(data))
    }else{
      return;
    } 
  }
  if (session?.user?.email) {
    QueryData()
  }else{
    return;
  }
  
},[session])
 
 // Post when cart is set
useEffect(() =>{
  const setcart = async () => {
    await fetch(`${BACKEND_URL}postingitems/`,{
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"cart": cart.items, "session": session?.user?.email})
    })
     
  }
  setcart()
},[cart.items])

}

export default CartItemsQuery