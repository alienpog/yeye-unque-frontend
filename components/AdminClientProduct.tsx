"use client"
import { CursorArrowRaysIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { ChevronDoubleDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { FormEvent, useState } from "react";
import BACKEND_URL from "@/src/apiConfig";
import { ClassicSpinner } from "react-spinners-kit";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { adminopenVendor } from "@/src/redux/slices/AdminImageSlice";
import { openvendor } from "@/src/redux/slices/AdminopenvendorSlice";
import { putid } from "@/src/redux/slices/AdminchangepinSlice";
import { RootState } from "@/src/redux/store";

interface Props{
    item: any;
}

function AdminClientProduct({item}: Props) {
    
    const [loading, setLoading] =useState(false);
    const [error, setError] =useState(false);

    // posting
    const [clientdate, setClientDate]= useState(item.schedule_date);
    const [clientdiscussion, setClientDiscussion]= useState(item.discussion);
    const [clientprocess, setClientProcess]= useState(item.processing);
    const [deletecheck, setDeleteCheck] = useState(false)


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
    // dispatching items
    const dispatch = useAppDispatch();
    
    const numberWithCommas = (number: any) => {
        return number?.toLocaleString();};

    async function updateclientproduct(e:FormEvent<HTMLFormElement>){
     e.preventDefault();
     setLoading(true);
     const res = await fetch(`${BACKEND_URL}adminupdateclientproduct/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({'id':item.id, 'clientdate': clientdate, 'clientprocess': clientprocess, 'clientdiscussion':clientdiscussion}), 
     });
     if(res.status === 200){
        setLoading(false)
     }else{setError(true),setLoading(false)}
    } 
    
    async function deletefreegift(){
        const res = await fetch(`${BACKEND_URL}admindeletefreegift/${item.id}`)
        if(res.status == 200){
            setDeleteCheck(true)
        }else return;
        
    }
        
  return (
    <form className={`w-full flex flex-col ${red == item.id ? "bg-[#75192A]":" bg-[#E7D6CE]"} py-5 drop-shadow-lg rounded-lg transition-all duration-500 ease-in-out`} onSubmit={updateclientproduct}>
    <div className={`w-full ${red == item.id ? "text-[#E7D6CE]":" text-[#75192A]"} flex h-[10px] flex-row item-center space-x-6 text-center text-xs font-light mb-6`}>
        <p className="Admin-Table-H">Product Image</p>
        <p className="Admin-Table-H">Product Name</p>
        <p className="Admin-Table-H">Product Price</p>
        <p className="Admin-Table-H">Quantity</p>
        <p className="Admin-Table-H">Processing</p>
        <p className="Admin-Table-H">Vendor Price</p>
        <p className="Admin-Table-H">Total Price</p>
        <p className="Admin-Table-H">Measurement</p>
        <p className="Admin-Table-H">Vendor Name</p>
        <p className="Admin-Table-H">Vendor Contact</p>
        <p className="Admin-Table-H">Vendor Location</p>
        <p className="Admin-Table-H">Schedule Date</p>
        <p className="Admin-Table-H">Discussion</p>
        <p className="Admin-Table-H">Created On</p>
        <p className="Admin-Table-H">Updated On</p>
    </div>
    <div className={`flex flex-row item-center space-x-6 text-center text-xs ${red == item.id ?"text-[#ffff]": "text-[#00000]"}`}>
        <div className="Admin-Table-H flex flex-col justify-center items-center">
            <div className="my-1 relative ">
            <div className=' absolute top-[-2px] right-[-10px] bg-white w-[24px] h-[24px] flex items-center justify-center overflow-hidden rounded-lg z-30'>
            <Image src={item.vendor_image ||"/images/logoyeye.png"} alt="image" width={500} height={500} className="w-full h-full object-contain z-20 "/>  
            </div>
             <div className="h-[60px] w-[50px] overflow-hidden rounded-3xl relative">
             {!item.price && <p className="absolute bottom-0 bg-[#ff0000] py-[1px] w-full text-white text-[8px] font-semibold">free</p>}
              <Image src={item.image} alt="image" width={500} height={500} className="w-full h-full object-cover z-20"/>
             </div>
            </div>
            <div className="Admin-Pin" onClick={()=>dispatch(putid(item.id))}>
            {red == item.id ?<p>Unpin Me</p>:<><CursorArrowRaysIcon className="w-3 h-3"/>
            <p>Pin Me</p></>}
            </div>
            <div className="Admin-Pin" onClick={()=>{dispatch(openvendor()),dispatch(adminopenVendor({productimage:item.image, vendorimage:item.vendor_image, vendorname:item.vendor_name, vendorphonenumber:item.Vendor_contact, vendorprice:item.vendor_price, vendorloction:item.vendor_location}))}}><PencilSquareIcon className="w-3 h-3"/><p>Check</p></div>
            {!item.price && <div className="Admin-Pin" onClick={deletefreegift}>{deletecheck?"Deleted":<><TrashIcon className="w-3 h-3"/><p>delete</p></>}</div>}   
            <button type="submit" className="Admin-Pin">  {loading?<ClassicSpinner size={10} color="blue"/>: error?"Not Sent":"Save"}</button>
        </div>
        <p className="Admin-Table-H">{item.name}</p>
        <p className="Admin-Table-H"><span className='line-through'>{item.price && "N"}</span>{numberWithCommas(item.price)}</p>
        <p className="Admin-Table-H">{item.quantity}</p>
        <div className="relative">
          <select value={clientprocess} onChange={(e)=>{setClientProcess(e.target.value),setError(false)}} className={` ${clientprocess == "pending"? "bg-[#FFD110]" : clientprocess == "done"? "bg-green-500" :"bg-[#FC1D1D]"} bg-[#FC1D1D] w-[250px] rounded-lg border-2 border-[#E7D6CE] appearance-none text-xs px-6 py-3 outline-none drop-shadow-lg text-white`}>
              <option>pending</option>
              <option>done</option>
              <option>cancel</option>
          </select>
          <ChevronDoubleDownIcon className="w-4 h-4 text-[#ff0000] absolute top-4 right-3"/>
      </div>
        <p className="Admin-Table-H"><span className='line-through'>{item.vendor_price && "N"}</span>{numberWithCommas(item.vendor_price)}</p>
        <p className="Admin-Table-H"><span className='line-through'>{item.total_value && "N"}</span>{numberWithCommas(item.total_value)}</p>
        <p className="Admin-Table-H">{item.measurement?"True": "False"}</p>
        <p className="Admin-Table-H">{item.vendor_name}</p>
        <p className="Admin-Table-H">{item.Vendor_contact}</p>
        <p className="Admin-Table-H">{item.vendor_location}</p>
        <div className="Admin-inputfield">
        <input type="text" value={clientdate} onChange={(e)=>{setClientDate(e.target.value),setError(false)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
         border-none bg-transparent" placeholder="Schedule Date"/>
        </div>  
        <div className="Admin-inputfield">
        <textarea value={clientdiscussion} onChange={(e)=>{setClientDiscussion(e.target.value),setError(false)}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Discussion...." cols={8} rows={6} />
        </div>
        <p className="Admin-Table-H">{formatDate(item.created_at)}</p>   
        <p className="Admin-Table-H">{formatDate(item.updated_at)}</p>   
    </div>
    </form>
  )
}

export default AdminClientProduct