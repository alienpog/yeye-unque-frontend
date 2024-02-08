"use client"
import BACKEND_URL from "@/src/apiConfig"
import { useAppDispatch, useAppSelector} from "@/src/redux/hooks"
import { adminloginremove, adminloginset } from "@/src/redux/slices/AdminLoginSlice"
import { RootState } from "@/src/redux/store"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit"

function AdminLogIn() {
  const dispatch = useAppDispatch();

  const router = useRouter()

  const [loginname, setLoginName] = useState("")
  const [loginpassword, setLogInPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

    async function submmitform(e: FormEvent<HTMLFormElement>){
      e.preventDefault()
      setLoading(true)
      const res = await fetch(`${BACKEND_URL}adminlogin/`,{
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"username":loginname, "password":loginpassword})
      })
      const data = await res.json();
      if(res.status === 200){
        setLoading(false)
        localStorage.setItem('adminstatus', JSON.stringify(data))
        dispatch(adminloginset(data))
      }else{
        setError("something went wrong")
        setLoading(false)
      }
    }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F2F2F2]">
        <Image src="/images/yeye-unique-logo.png" alt='logo' width={200} height={200} className='h-[60px] object-contain absolute top-4 left-4'/>
        <div>
        {error && <p className="w-full text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-2 my-4 rounded-lg z-30">{error}</p> } 
        <form className="max-w-[460px] flex flex-col items-center justify-center gap-6" onSubmit={submmitform}>  
        <div className="Admin-inputfield">
        <input type="text" value={loginname} onChange={(e)=>{setLoginName(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Admin Name"/>
        </div>
        <div className="Admin-inputfield">
        <input type="password" value={loginpassword} onChange={(e)=>{setLogInPassword(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Admin Password"/>
        </div>
        <div className="flex items-center justify-center w-full mt-2 md:mt-4">
        <button className="text-xs text-white font-bold py-2 px-12 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer"
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Log In"}
        </button>   
        </div>
        </form>
    </div>
    </div>
  )
}

export default AdminLogIn