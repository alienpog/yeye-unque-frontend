"use client"
import BACKEND_URL from "@/src/apiConfig"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { FormEvent, useEffect, useState } from "react"
import AdminAllCustomer from "./AdminAllCustomer"

interface Props{
    id: string,
    name: string,
    image: string,
    phone_number: string,
    email: string,    
    total_price: number,
    location: string,
    created_at: string,
    updated_at: string,
    funnel_complete: boolean,
   }

function AdminClosedCustomer() {
      // posting
  const [post, setPost]= useState("");

  // getting Data
  const [data, setData]= useState<Props[]>([])
  useEffect(() =>{
      async function fetchquery(){
          const res = await fetch(`${BACKEND_URL}adminseeclosedcustomers/`)
          const data = await res.json();
          setData(data);
      }
      fetchquery();
  },[]);


  // seachquery
  async function seachquery(e:FormEvent<HTMLFormElement>){
   e.preventDefault();
   const res = await fetch(`${BACKEND_URL}adminsearchclosecustomer/${post}/`)
   const data = await res.json();
   setData(data);
   setPost("");
  }

  return (
    <div>
      <div className="fixed bottom-0 w-full h-[45px] bg-gradient-to-t from-[#F2F2F2] z-20">
      <form className={`absolute bottom-0 -translate-x-40 w-full flex opacity-1 h-[32px] sm:h-[42px] transition-all duration-300 ease-in-out `} onSubmit={seachquery}>
      <div className='w-full h-full max-w-3xl mx-2 sm:mx-4 md:mx-auto md:max-w-2xl flex items-center justify-center space-x-1'>
      <div className="py-1 sm:py-2 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-l-md sm:rounded-l-lg border-2 border-[#E8D7D0]">
      <MagnifyingGlassIcon className="w-3 object-contain mr-1 text-red-300"/>
      <input type="text" value={post} onChange={(e)=>{setPost(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 placeholder:text-[11px] focus:ring-0 outline-none
      border-none  bg-transparent" placeholder="Seach Client..." />
      </div>
      <button type='submit' disabled={!post} className="flex bg-[#E8D7D0] rounded-r-md sm:rounded-r-lg h-full w-9 md:w-10 justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed hover:text-white transition-all duration-500 ease-in-out">
      <MagnifyingGlassIcon className="w-4 h-4"/></button>
      </div>
    </form>
      </div>
      <div className="flex flex-col space-y-5 px-3 pt-5 overflow-hidden overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin">
      {data.map((item) => <AdminAllCustomer item ={item} key ={item.id}/>)}
      </div>
  </div>
  )
}

export default AdminClosedCustomer