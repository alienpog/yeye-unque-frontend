"use client"
import MiniCon from "@/components/MiniCon"
import SectionHeader from "@/components/SectionHeader"
import { useAppSelector } from "@/src/redux/hooks";
import { RootState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../src/redux/hooks";
import { ClassicSpinner } from "react-spinners-kit";
import { clearproduct } from "@/src/redux/slices/bagSlice";
import { closeaction } from "@/src/redux/slices/couponSlice";
import BACKEND_URL from "@/src/apiConfig";
import { openthank } from "@/src/redux/slices/thankyouSlice";

function CheckOutPage() {

const [loading,setLoading] = useState(false)

const [total,setTotal] = useState()

const dispatch = useAppDispatch()
const {data : session} = useSession()

const router = useRouter()

const products = useAppSelector((state: RootState) => state.cartReducer.cart);
const hasMeasurement = products.items?.some((product) => product.measurement === true);
 
  // getting the price state
 useEffect(()=>{
  async function priceget(){
    if(!session) return router.replace("/");
     const res = await fetch(`${BACKEND_URL}priceget/`,{
          method: "POST",
          headers: {
          'content-type': 'application/json',
          },
          body: JSON.stringify({"email": session?.user?.email})
      })
      const data : any = await res.json();
      setTotal(data.number)
      if(products.items.length == 0){
        router.replace("/add-bag")
     }
  }
  priceget()
},[session]
)

 function submitdata (){
    setLoading(true);
    if(total){
        fetch(`${BACKEND_URL}close-user/`,{
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({"email": session?.user?.email, "items": products.items, "total": total})
    })
    dispatch(clearproduct())
    dispatch(closeaction())
    dispatch(openthank())
    router.replace("/thank-you")
    }else{
        router.replace("/add-bag")
    }
   
    
 }

 const numberWithCommas = (number: number) => {
  return number?.toLocaleString(); };


  return (
    <MiniCon>
    <div className="flex flex-col items-center justify-center gap-2 lg:gap-6 py-3 lg:pt-6 lg:pb-16">
     <SectionHeader conheader="Check Out" red={false} />
     <div className="flex flex-col-reverse sm:flex-row max-w-5xl mx-auto lg:gap-12">
        <div className="basis-1/2 overflow-hidden">
            <Image src="/images/check_out_animi.gif" width={500} height={500} alt="check-out" className="scale-150"/>
        </div>
        <div className="basis-1/2 flex flex-col justify-center items-start gap-4 lg:gap-8">
            <h1 className="text-center w-full text-[#323232] font-bold text-[16px] lg:text-[24px]">How the Processing Work</h1>
            <div className="flex flex-col justify-center items-start gap-3 lg:gap-6">
           {hasMeasurement && <div className="flex items-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000]"/>
            <p className="text-xs font-medium text-[#333333] flex-1">Our Agent will contact you for your measurement </p>
           </div>}
           <div className="flex items-start space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-1"/>
            <p className="text-xs font-medium text-[#333333] flex-1">Discussing about the Design and also if there is or not, and how long the process will take to finish the design</p>
           </div>
           <div className="flex items-start space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-1"/>
            <p className="text-xs font-medium text-[#333333] flex-1">If there is any issue when the product was delivered or before one month, contact our customer care to solve the issues for Free </p>
           </div>
           <div className="flex items-start space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-2"/>
            <p className="text-xs font-medium text-[#333333] flex-1">Our payment processing will only be approved when this phone number 
              <span className="text-black font-bold"> 0701 407 4694 </span>call’s you any other number that contacts you for payment please do not proceed for safety reasons </p>
           </div>
           {total && <div className="flex items-start space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-1"/>
            <p className="text-xs font-medium text-[#333333] flex-1">Total Price <span className="text-black font-bold"><span className='line-through'>N</span>{numberWithCommas(total)}</span></p>
           </div>}
           </div>
           <button disabled={products.items.length == 0 || !total} className="text-center mx-auto rounded-full drop-shadow-md bg-[#9C0F0F] text-white font-semibold text-xs py-2 px-6 cursor-pointer disabled:text-white/50 disabled:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/50" onClick={submitdata} > {loading?<ClassicSpinner size={15} color="white"/>:"Finalize your Order"}</button>
        </div>
     </div>
    </div>
    </MiniCon>
  )
}

export default CheckOutPage