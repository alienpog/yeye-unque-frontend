"use client"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Props{
    producturl: string
}

function ClickSeeMoreProduct({producturl}:Props) {
    const router = useRouter()
  return (
    <div>
        <div className="relative w-[320px] h-[300px] mb-2 rounded-3xl bg-[#D9D9D9] flex justify-center items-center">
        <div className="w-[320px] flex flex-col justify-center items-center space-y-2 cursor-pointer group" onClick={()=>router.push(producturl)}>
        {/* <Image src="/images/see more.png" alt="view more" width={500} height={500} placeholder='blur' blurDataURL='URL'
        className=' h-14 w-14 object-contain'/> */}
        <div className=" flex items-center justify-center h-16 w-16 rounded-full bg-[#E8D7D0] ">
          <ArrowRightIcon className="h-6 w-6 group-hover:text-white transition-all duration-500 ease-in-out" color="000000"/>
        </div>
        <p className="text-xs text-center text-[#ff0000] group-hover:text-red-300 transition-all duration-500 ease-in-out">See More</p>
        </div>
        </div>
    </div>
  )
}

export default ClickSeeMoreProduct