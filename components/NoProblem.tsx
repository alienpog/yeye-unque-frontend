import Image from "next/image"
import PhoneImage from "@/public/images/phone 10x.png"
import WideDivice from "@/public/images/yeye 10x big screen.png"
function NoProblem() {
  return (
    <div className="w-full">
        <Image className="md:hidden w-full h-[100svh] object-contain" src={PhoneImage} alt="phone"/>
        <Image className="hidden md:flex w-full h-[100svh] object-contain" src={WideDivice} alt="wide"/>
    </div>
  )
}

export default NoProblem