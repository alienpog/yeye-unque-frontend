"use client"
import BACKEND_URL from "@/src/apiConfig"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { putid } from "@/src/redux/slices/AdminchangepinSlice"
import { RootState } from "@/src/redux/store"
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

function AdminSeeCoupon({item}:any) {

    // number of time used
    const [number, setNumber]= useState()
    
    // Function to format a date string
    const formatDate = (isoDateString: string) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
    };
   
    // changing the background color of item
    const red = useAppSelector((state :RootState) => state.productidReducer.value);
    useEffect(() =>{
        async function querycoupon(){
            const res = await fetch(`${BACKEND_URL}adminquerycount/${item.id}`)
            const data = await res.json();
            setNumber(data)
        }
        querycoupon();
    },[item.id])

     
    
    // dispatching items
    const dispatch = useAppDispatch();
  return (
        <div className={` w-full flex flex-col ${red == item.id ? "bg-[#75192A]":" bg-[#E7D6CE]"} py-5 drop-shadow-lg rounded-lg transition-all duration-500 ease-in-out`}>
        <div className={`w-full ${red == item.id ? "text-[#E7D6CE]":" text-[#75192A]"} flex h-[10px] flex-row item-center space-x-6 text-center text-xs font-light mb-6`}>
            <p className="Admin-Table-H">Coupon Name</p>
            <p className="Admin-Table-H">Time Used</p>
            <p className="Admin-Table-H">Coupon Owner</p>
            <p className="Admin-Table-H">Owner Phone Number</p>
            <p className="Admin-Table-H">Owner Email</p>
            <p className="Admin-Table-H">Created On</p>
            <p className="Admin-Table-H">Updated On</p>
        </div>
        <div className={`flex flex-row item-center space-x-6 text-center text-xs ${red == item.id ? "text-[#ffff]":" text-[#00000]"}`}>
            <div className="Admin-Table-H flex flex-col justify-center items-center space-y-2">
            <div className="Admin-Table-H flex flex-row space-x-2 items-center justify-center text"><span className='bg-[#FF0101] w-[24px] h-[24px] flex items-center justify-center text-white text-[12px] rounded-lg'>{item.id}{" "}</span><p>{item.coupon_name}</p></div> 
                <div className="Admin-Pin" onClick={()=>dispatch(putid(item.id))}>
                {red == item.id ?<p>Unpin Me</p>:<><CursorArrowRaysIcon className="w-3 h-3"/>
                <p>Pin Me</p></>}
                </div>
            </div>
            <div className="min-w-[250px] max-w-[300px] text-center">{number}</div>
            <p className="Admin-Table-H">{item.owner_name}</p>
            <p className="Admin-Table-H">{item.owner_phone_number}</p>
            <p className="Admin-Table-H">{item.owner_email}</p>
            <p className="Admin-Table-H">{formatDate(item.created_at)}</p>
            <p className="Admin-Table-H">{formatDate(item.updated_at)}</p>
        </div>
        </div>
  )
}

export default AdminSeeCoupon