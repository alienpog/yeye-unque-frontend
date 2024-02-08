"use Client"
import BACKEND_URL from '@/src/apiConfig'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { putid } from '@/src/redux/slices/AdminchangepinSlice'
import { RootState } from '@/src/redux/store'
import { ChevronDoubleDownIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import React, { FormEvent, useState } from 'react'

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

function AdminClosedForm({ item, index, array }:any) {
    const reversedIndex = array.length - index - 1
    // data
    const [error, setError] =useState(false)
    const [scheduledate, setScheduleDate] = useState(item.schedule_date)
    const [discussion, setDiscussion] = useState(item.discussion)
    const [clientprocess,setClientProcess]=useState("pending")
    const [cleared, setCleared] = useState("")

    const number = reversedIndex + 1 
 
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
    async function updatecontactclient(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const res = await fetch (`${BACKEND_URL}adminupdatecontactclient/`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id":item.id, "clientdate":scheduledate, "clientprocess":clientprocess, "clientdiscussion": discussion})

            });
            if(res.status === 200){
                setCleared("Cleared");
            }else{
                setError(true)
            }

    }

    return (
        <form className={`w-full flex flex-col ${red == item.id ? "bg-[#75192A]":" bg-[#E7D6CE]"} py-5 drop-shadow-lg rounded-lg transition-all duration-500 ease-in-out`} onSubmit={updatecontactclient}>
        <div className={`w-full ${red == item.id ? "text-[#E7D6CE]":" text-[#75192A]"} flex h-[10px] flex-row item-center space-x-6 text-center text-xs font-light mb-6`}>
            <p className="Admin-Table-H">Contact Status</p>
            <p className="Admin-Table-H">Client Name</p>
            <p className="Admin-Table-H">Client Phone Number</p>
            <p className="Admin-Table-H">Client Email</p>
            <p className="Admin-Table-H">Processing</p>
            <p className="Admin-Table-H">Schedule Date</p>
            <p className="Admin-Table-H">Discussion</p>
            <p className="Admin-Table-H">Created On</p>
            <p className="Admin-Table-H">Updated On</p>
        </div>
        <div className={`flex flex-row item-center space-x-6 text-center text-xs ${red == item.id ?"text-[#ffff]": "text-[#00000]"}`}>
            <div className="Admin-Table-H flex flex-col justify-center items-center space-y-1">
                <div className='relative'>
                <span className='absolute top-[-2px] right-[-10px] bg-[#FF0000] w-[24px] h-[24px] flex items-center justify-center text-white text-[12px] rounded-lg z-30'>{number}</span>
                <div className={`flex justify-center items-center h-[60px] w-[50px] overflow-hidden rounded-3xl relative ${clientprocess == "done"? "bg-green-500":"bg-[#FFD110]"}`}>
                    <p className=' text-white text-3xl font-extrabold'>{clientprocess == "done" ?"D":"P"}</p>
                </div>
                </div>
                <div className="Admin-Pin" onClick={()=>dispatch(putid(item.id))}>
                {red == item.id ?<p>Unpin Me</p>:<><CursorArrowRaysIcon className="w-3 h-3"/>
                <p>Pin Me</p></>}
                </div>  
                <button type="submit" className="Admin-Pin">{cleared? cleared :"Done"}</button>
            </div>
            <p className="Admin-Table-H">{item.name}</p>
            <p className="Admin-Table-H">{item.phone}</p>
            <p className="Admin-Table-H">{item.gmail}</p>
            <div className="relative">
            <select value={clientprocess} onChange={(e)=>{setClientProcess(e.target.value),setError(false)}} className={` ${clientprocess == "pending"? "bg-[#FFD110]" : "bg-green-500"} w-[250px] rounded-lg border-2 border-[#E7D6CE] appearance-none text-xs px-6 py-3 outline-none drop-shadow-lg text-white`}>
                <option>pending</option>
                <option>done</option>
            </select>
            <ChevronDoubleDownIcon className="w-4 h-4 text-[#ff0000] absolute top-4 right-3"/>
        </div>
            <div className="Admin-inputfield">
            <input type="text" value={scheduledate} onChange={(e)=>{setScheduleDate(e.target.value),setError(false)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
            border-none bg-transparent" placeholder="Schedule Date"/>
            </div>  
            <div className="Admin-inputfield">
            <textarea value={discussion} onChange={(e)=>{setDiscussion(e.target.value),setError(false)}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
            border-none  bg-transparent" placeholder="Discussion...." cols={8} rows={6} />
            </div>
            <p className="Admin-Table-H">{formatDate(item.created_at)}</p>   
            <p className="Admin-Table-H">{formatDate(item.updated_at)}</p>   
        </div>
        </form>
    )
}

export default AdminClosedForm