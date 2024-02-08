"use client"
import { useEffect, useState } from "react"
import AdminClosedForm from "./AdminClosedForm"
import BACKEND_URL from "@/src/apiConfig"

interface Props{
    id:number;
    name:string; 
    phone:string;
    gmail:string; 
    schedule_date?:string;
    discussion?:string;
    created_at:string;
    updated_at:string;

}

function AdminContactClient() {
    const [items,setItems]= useState<Props[]>([])
    const [check, setCheck] = useState(true)
    useEffect(()=>{
        async function getContact(){
           const res = await fetch(`${BACKEND_URL}admingetallcontactclients/`)
           const data = await res.json() 
           if (res.status === 200){
            setItems(data)
           }else{
            setCheck(false)
           }
              
        }
        getContact()
    },[])
    console.log("items",items)
  return (
    <div className="flex flex-col space-y-5 px-3">
       {!check && <h1 className='text-xs lg:text-sm text-[#5D5D5D] font-medium text-center translate-x-[500px] t mt-12 lg:mb-28'>No Clients</h1> }
       {check && items.map((item, index, array) => <AdminClosedForm item = {item} key ={item.id} index = {index} array={array}/>)}
    </div>
  )
}

export default AdminContactClient