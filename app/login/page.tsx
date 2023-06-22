'use client'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClassicSpinner } from "react-spinners-kit";


function LoginPage() {
const [loading, Setloading]= useState(false)
 const { data : session }= useSession();
 const router = useRouter()
 useEffect(()=>{
  async function login(){
     if(!session)return;
      const res =await fetch(`https://yeye-unique-backend-production.up.railway.app/loginuser/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'name': session?.user?.name,
          'email': session?.user?.email,
          'image': session?.user?.image,
        })
     })
     router.replace('/');
   }
   
   login()
    
  },[session])

 if (session) {
    return  <div className=" w-full h-screen ">
               <img src="/images/logo-animi-red.gif" className="h-24 object-contain absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4" alt="loader"/>
            </div>; 
  }

  return (
      <div className="  flex flex-col items-center justify-center space-y-10 mb-8 h-[100svh] ">
        <img src = "/images/logo-animi-yeye.gif" alt="logo" className="max-h-[300px] max-w-[300px] mx-2 sm:mx-auto "/>
        <div className="flex justify-center mt-4  max-w-6xl mx-auto">
            <div className="text-xs text-[#FF0000] font-bold py-2 px-6 border-2 border-[#E7D6CE] animate-pulse
            rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer" onClick={()=>{signIn("google"),Setloading(true)}}>
            {loading?<ClassicSpinner size={15} color="#FF0000"/>:"Sign In With Google"}
            </div>
        </div>
      </div>  
  )
}

export default LoginPage