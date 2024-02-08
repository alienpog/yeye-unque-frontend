"use client"

import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit"
import SectionHeader from "./SectionHeader"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'
import BACKEND_URL from "@/src/apiConfig"


interface User{
  name: string | null ;
  gmail: string | null;
  phone: string | null;
  address: string | null
}
function Settings() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('query')
    // loading save
    const [loading,setLoading] = useState(false)
    // router to the home page
    const router = useRouter()

    // error
    const [error,setError] = useState("")
    
    // submitting inputs
    const [name,setName] = useState<any>("")
    const [number,setNumber] = useState<any>("")
    const [address,setAddress] = useState<any>("")

    // get data at first load
    const {data: session} = useSession();

    // submitting form
    async function submitform(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      setLoading(true);
      const phoneno ='[0-9]{10}'
      const input_name = name.trim()
      // const input_address = address.trim()
      if(!name || !address || !number)return setError("All fields required"),setLoading(false);
      if(number.match(phoneno)){
      // https://yeye-unique-backend-production.up.railway.app/
        await fetch(`${BACKEND_URL}postingaddress/`,
        {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({'name':input_name, 'address':address,'phone':number, 'email':session?.user?.email})
        })
        if(query != "setting"){
          router.replace("/")
        }else{
          router.replace("/add-bag/?#setting")
        }
       
        setLoading(false);
        }else{
          setError("Please put your Phone Number")
          setLoading(false);
          setNumber("")
        }
    }  

    useEffect(()=>{
      async function getUserData(){
          const res =await fetch(`${BACKEND_URL}gettingform/`,
          {
              method: "POST",
              headers: {
                'content-type': 'application/json' 
              },
              body: JSON.stringify({'email': session?.user?.email})
          })
          const data: User = await res.json()
          setName(data?.name)
          setAddress(data?.address)
          setNumber(data?.phone)

      }
      getUserData()  
  },[session])
  

  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    <SectionHeader conheader="Profile Setting" red={false}/>
    <div className=" flex flex-col max-w-lg mx-auto">
        {error && <p className="w-full text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-1 rounded-md shadow-sm mb-4">{error}</p>}  
        <h2 className="text-xs text-[#464646] font-medium mb-4">All inputs are required for a <span className="font-bold"> Better Experience </span> with the application and you can also skip the process</h2>
        <form className="flex flex-col items-center justify-center gap-2 mt-2 mb-4" onSubmit={submitform}  >
        <div className="inputfield">
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Your Name...."/>
        </div>
        <div className="inputfield">
        <input type="text" value={number} onChange={(e)=>{setNumber(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Your Phone Number...."/>
        </div>
        <div className="inputfield">
        <textarea value={address} onChange={(e)=>{setAddress(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Your Delivery Address...." rows={8} cols={40} />
        </div>
        
        <div className="flex items-center justify-between w-full mt-2 md:mt-4"> 
        {query != "setting" &&  <Link href="/"className="text-xs text-[#333333] font-bold py-2 px-6 bg-[#E7D6CE] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer ">
        Skip
        </Link> } 
       
        <button className="text-xs text-white font-bold py-2 px-6 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer "
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Save"}
        </button>  
        </div>    
        </form> 
    </div>
    </>
  )
}

export default Settings