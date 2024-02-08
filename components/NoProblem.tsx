import Image from "next/image"
import PhoneImage from "@/public/images/phone 10x02-png.png"
import WideDivice from "@/public/images/yeye no problem-wild-png.png"
import Link from "next/link"
function NoProblem() {
  return (
    <div className="w-full">
      <div className="md:hidden">
       <Image width={500} height={500} className=" w-full object-contain" src={PhoneImage} alt="phone"/>
        <div className="bg-[#E8D7D0] flex flex-col space-y-4 pb-6">
          <Image width={500} height={500} className=" w-12 object-contain ml-4" src="/images/logo-animi-yeye.gif" alt="phone"/>
          <p className="text-lg text-black font-bold px-4">Searching for a design style that stands out from the rest? We're the solution you've been looking for. Let's bring your ideas to life together.</p>
          <div className="w-full flex justify-center"><Link href='/contact-us' className="text-xs py-1 px-6 font-semibold text-white rounded-full bg-[#9C0F0F] shadow-lg hover:shadow-none transition-all duration-500 ease-in-out">Click Here To Contact US </Link></div>  
        </div> 
      </div>
        <div className=" hidden md:flex flex-row justify-between items-center bg-[#E8D7D0]">
        <div className="bg-[#E8D7D0] flex flex-col space-y-8 pb-6">
          <Image width={500} height={500} className=" w-12 object-contain ml-4" src="/images/logo-animi-yeye.gif" alt="phone"/>
          <p className="text-2xl text-black font-bold px-4">Searching for a design style that stands out from the rest? We're the solution you've been looking for. Let's bring your ideas to life together.</p>
          <div className="w-full flex justify-center"><Link href='/contact-us' className="text-xs py-2 px-6 font-semibold text-white rounded-full bg-[#9C0F0F] shadow-lg hover:shadow-none transition-all duration-500 ease-in-out">Click Here To Contact US </Link></div>  
        </div>
        <Image width={500} height={500} className=" w-full object-contain" src={WideDivice} alt="phone"/>
        </div>
    </div>
  )
}

export default NoProblem