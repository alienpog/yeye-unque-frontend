'use client'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props{
    onclick: () => void
    accountactive: boolean
}

function AccountMenu({onclick, accountactive}:Props) {
  const { data : session }= useSession();
  const pathname = usePathname();
 
  function logout(){
    signOut();
    onclick;
    }  
  
  return (
    <div className={` flex flex-col lg:gap-4 z-30 fixed top-8 sm:top-12 bg-[#F2F2F2] py-4 rounded-2xl lg:py-8 drop-shadow-lg text-xs ${accountactive? "right-5" : "right-[-100%]"} transition-all duration-500 ease-in-out`}>
      <Link href="/dashboard" className="border-[#E7D6CE] border-b-2 flex items-center space-x-2 py-2 px-4 lg:px-8" onClick={ onclick}>
      <img className="w-4 h-4 object-contain rounded-full" loading="lazy" src={session?.user?.image ||"/images/Avatar-Profile-PNG.png" } alt="avatar" />
      <p className={`text-black ${pathname =="/dashboard" && "text-[#E7D6CE]"} font-medium text-center cursor-pointer  hover:text-[#E7D6CE] transition-all duration-300 ease-in-out`}>Dashboard</p>
      </Link>
      <Link href="/user-setting" className="border-[#E7D6CE] border-b-2 ">
      <p className={`${pathname =="/user-setting" && "text-[#E7D6CE]"} text-black font-medium text-center py-2 px-4 lg:px-8 cursor-pointer hover:text-[#E7D6CE] transition-all duration-300 ease-in-out`} onClick={onclick}>Settings</p>
      </Link>
      <p className="text-black font-medium text-center py-2 px-4 lg:px-8 cursor-pointer  hover:text-[#E7D6CE] transition-all duration-300 ease-in-out" onClick={logout}>Log out</p>
      <XMarkIcon className='w-4 h-4 sm:w-6 sm:h-6 cursor-pointer absolute bottom-2 right-2 text-red-500 hover:text-[#E7D6CE] transition-all duration-300 ease-in-out' onClick={onclick}/>
    </div>
  )
}

export default AccountMenu