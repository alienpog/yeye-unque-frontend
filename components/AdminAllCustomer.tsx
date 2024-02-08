"use client"
import { CursorArrowRaysIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import AdminClientImage from "./AdminClientImage"
import { useEffect, useState } from "react";
import BACKEND_URL from "@/src/apiConfig";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { RootState } from "@/src/redux/store";
import { putid } from "@/src/redux/slices/AdminchangepinSlice";


function AdminAllCustomer({item}: any) {

  const [process,setProcessing]=useState<any>("")

  // routing data
  const router = useRouter();
  
  const red = useAppSelector((state :RootState) => state.productidReducer.value);
  // dispatching items
  const dispatch = useAppDispatch();

useEffect(()=>{
    async function totalprocessing(){
     const res = await fetch(`${BACKEND_URL}admingettotalprocessing/${item.id}`);
     const data = await res.json();
     setProcessing(data)
    }
     totalprocessing()
 },[item.id])
   // Function to format a date string
 const formatDate = (isoDateString: string) => {
 const dateObject = new Date(isoDateString);
 const year = dateObject.getFullYear();
 const month = String(dateObject.getMonth() + 1).padStart(2, '0');
 const day = String(dateObject.getDate()).padStart(2, '0');
 return `${day}/${month}/${year}`;
};

const numberWithCommas = (number: number) => {
    return number?.toLocaleString();};
  return (
    <div className={`w-full flex flex-col ${red == item.id ? "bg-[#75192A]":" bg-[#E7D6CE]"} py-5 drop-shadow-lg rounded-lg transition-all duration-500 ease-in-out`}>
      <div className={`w-full ${red == item.id ? "text-[#E7D6CE]":" text-[#75192A]"} flex h-[10px] flex-row item-center space-x-6 text-center text-xs font-light mb-6`}>
          <p className="Admin-Table-H">Client Image</p>
          <p className="Admin-Table-H">Client Name</p>
          <p className="Admin-Table-H">Client Phone Number</p>
          <p className="Admin-Table-H">Client Email</p>
          <p className="Admin-Table-H">Delivery</p>
          <p className="Admin-Table-H">Total Price</p>
          <p className="Admin-Table-H">Shipping Call</p>
          <p className="Admin-Table-H">Location</p>
          <p className="Admin-Table-H">Created On</p>
          <p className="Admin-Table-H">Updated On</p>
          <p className="Admin-Table-H">Funnel Complete</p>
      </div>
      <div className={`flex flex-row item-center space-x-6 text-center text-xs ${red == item.id ? "text-[#ffff]" : "text-[#00000]"}`}>
          <div className="Admin-Table-H flex flex-col justify-center items-center">
              <div className="my-1 relative">
              <span className=' absolute top-[-2px] right-[-10px] bg-[#FF0000] w-[24px] h-[24px] flex items-center justify-center text-white text-[12px] rounded-lg z-30'>{item.id}</span>
               <div className="h-[60px] w-[50px] overflow-hidden rounded-3xl relative">
                <AdminClientImage image={item.image}/>
                {item.total_money == 0 && <p className="absolute bottom-0 bg-[#ff0000] py-[1px] w-full text-white text-[8px] font-semibold">New</p>}
               </div>
              </div>
              <div className="Admin-Pin" onClick={()=>dispatch(putid(item.id))}>
              {red == item.id ?<p>Unpin Me</p>:<><CursorArrowRaysIcon className="w-3 h-3"/>
              <p>Pin Me</p></>}
              </div>
              <div className="Admin-Pin" onClick={()=>router.push(`/only-admin-allowed/client-details/?id=${item.id}`)}>
              <PencilSquareIcon className="w-3 h-3"/>    
              <p>Check</p>
              </div>
          </div>
          <p className="Admin-Table-H">{item.name}</p>
          <p className="Admin-Table-H">{item.phone_number}</p>
          <p className="Admin-Table-H">{item.email}</p>
          <p className={`Admin-Table-H h-6 text-white rounded-lg py-1 ${process == "done"?"bg-green-500":"bg-[#FFD110] animate-pulse"}`}>{process}</p>
          <p className="Admin-Table-H"><span className='line-through'>N</span>{numberWithCommas(item.total_price)}</p>
          <p className="Admin-Table-H">{item.shipping_call?"True": "False"}</p>
          <p className="Admin-Table-H">{item.location}</p>
          <p className="Admin-Table-H">{formatDate(item.created_at)}</p>
          <p className="Admin-Table-H">{formatDate(item.updated_at)}</p>
          <p className="Admin-Table-H">{item.funnel_complete? "True" : "False"}</p>          
      </div>
      </div>
  )
}

export default AdminAllCustomer