"use client"
import BACKEND_URL from "@/src/apiConfig";
import Image from "next/image";
import { useEffect, useState } from "react";


function AdminSeeTestimonials() {
    const [data, setData] = useState<any[]>([])
    useEffect(() =>{
        async function fetchquery(){
            const res = await fetch(`${BACKEND_URL}adminseetestimonials/`)
            const data = await res.json();
            setData(data);
        }
        fetchquery();
    },[]);
    // Function to format a date string
    const formatDate = (isoDateString: string) => {
        const dateObject = new Date(isoDateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };
  return (
        <div className="flex flex-col space-y-5 px-3 pt-5 ">
        {data.map((item) =><div key={item.id} className={`w-full ml-12 flex flex-col bg-[#E7D6CE] py-5 drop-shadow-lg rounded-lg transition-all duration-500 ease-in-out`}>
        <div className={`w-full text-[#75192A] flex h-[10px] flex-row item-center space-x-6 text-center text-xs font-light mb-6`}>
            <p className="Admin-Table-H">Client Image</p>
            <p className="Admin-Table-H -translate-x-16">Client Name</p>
            <p className="Admin-Table-H -translate-x-8">Testimonial</p>
            <p className="Admin-Table-H -translate-x-5">Created On</p>
        </div>
        <div className={` w-full flex flex-row item-center justify-center space-x-6 text-center text-xs text-[#00000] translate-x-10`}>
            <div className="my-1 relative">
            <span className=' absolute top-[-2px] right-[-10px] bg-[#FF0101] w-[24px] h-[24px] flex items-center justify-center text-white text-[12px] rounded-lg'>{item.id}</span>
            <div className="h-[60px] w-[50px] overflow-hidden rounded-3xl">
              <Image src={item.client_picture} alt="image" width={500} height={500} className="w-full h-full object-cover z-20"/>
            </div>
            </div>
            <div className="Admin-Table-H2">{item.client_name}</div>
            <p className="Admin-Table-H2 min-w-[199px] max-w-[200px]">{item.client_comment}</p>
            <p className="Admin-Table-H2">{formatDate(item.created_at)}</p>
        </div>
        </div>)}
        </div>
  )
}
export default AdminSeeTestimonials