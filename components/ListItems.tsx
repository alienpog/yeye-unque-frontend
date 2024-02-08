"use client"

import BACKEND_URL from "@/src/apiConfig";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { gettinglists } from "@/src/redux/slices/listSlice";
import { RootState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import { useEffect} from "react"

function ListItems() {
  
// sessions from Google
const { data : session }= useSession();  

const dispatch = useAppDispatch(); 
const list = useAppSelector((state :RootState) => state.listReducer.list);

 // Post when cart is set
 useEffect(() =>{
    const setlist = async () => {
      await fetch(`${BACKEND_URL}posttinglists/`,{
          method: 'POST',
          headers: {  
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({"list": list, "session": session?.user?.email})
      })
       
    }
    setlist()
  },[list])
  
// get on first load
useEffect(() =>{
  
  async function QueryData(){
    
    const res= await fetch(`${BACKEND_URL}gettinglists/`,{ 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({"email": session?.user?.email}
        ),
    })
    const data = await res.json()
    if(data.length > 0) {
      dispatch(gettinglists(data))
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

}



export default ListItems

