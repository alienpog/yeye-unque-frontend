"use client"

import MiniCon from "@/components/MiniCon"
import Settings from "@/components/Settings"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function UserSetting() {
  const {data : session} = useSession()
  const router = useRouter()
  useEffect(()=>{
    if(!session){
      router.replace("/")
    }
  },[session])
  return (
    <MiniCon>
        <div className="flex flex-col gap-2 lg:gap-6 my-2 lg:my-4 min-h-[100svh]">
            <div className='flex items-center justify-start space-x-2 text-xs lg:text-[14px] font-medium'>
            <img src={session?.user?.image || "/images/Avatar-Profile-PNG.png"} loading="lazy" alt="client-photo" className='w-[32px] h-[32px] lg:w-[44px] lg:h-[44px] object-cover rounded-full'/>
            <p>{session?.user?.name}</p>
            </div>
            <Settings/>
        </div>
    </MiniCon>
  )
}

export default UserSetting