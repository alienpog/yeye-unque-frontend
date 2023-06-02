'use client'
import { signIn} from "next-auth/react"


function LoginPage() {

  return (
 
   <div className="  flex flex-col items-center justify-center space-y-10 mb-8 h-[100svh] ">
        <img src = "/images/logo-animi-yeye.gif" alt="logo" className="max-h-[300px] max-w-[300px] mx-2 sm:mx-auto "/>
        <div className="flex justify-center mt-4  max-w-6xl mx-auto">
            <div className="text-xs text-[#FF0000] font-medium py-2 px-6 border-2 border-[#E7D6CE] 
            rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer" onClick={()=>signIn("google")}>
            Sign In With Google
            </div>
        </div>

      </div>)  
}

export default LoginPage