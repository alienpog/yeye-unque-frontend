"use client"
import BACKEND_URL from "@/src/apiConfig";
import { useAppSelector } from "@/src/redux/hooks";
import { RootState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

function FreeGift() {
      const{data : session} = useSession();
      const [freegift, setFreeGift] = useState<any>({});
      const [number, setNumber] = useState(0)
      const cart = useAppSelector((state :RootState) => state.cartReducer.cart);
      
      // getting user total amount spent
      useEffect(()=>{
        async function numberquery() {
            const res = await fetch(`${BACKEND_URL}gettingamount/`,{
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({'email': session?.user?.email})
            })
        
        const data: number = await res.json()
        setNumber(data)
        }
        numberquery()
        
          },[session,cart])

     // getting the freegift state
     useEffect(()=>{
      async function couponget(){
         const res = await fetch(`${BACKEND_URL}freegift/`,{
              method: "POST",
              headers: {
              'content-type': 'application/json',
              },
              body: JSON.stringify({"email": session?.user?.email})
          })
          const data = await res.json();
          setFreeGift(data)
      }
      couponget()
  },[session]
  )

  const price_remains = freegift.price_to_pass - number 

  const numberWithCommas = (number : any) => {
    return number?.toLocaleString() // Automatically adds commas as per user's locale
  };

  return (
    <div className=' mt-4 lg:mt-6 flex flex-col sm:flex-row items-center sm:justify-around gap-16 sm:gap-6 md:gap-16 lg:gap-24 bg-[#E7D6CE] p-8 drop-shadow-lg rounded-lg'>
        <div className='flex flex-col gap-4'>
        <Image src="/images/Free Gift.png" alt='free gift' width={500} height={500} className="mb-8 w-full sm:min-w-[260px] max-w-[450px] object-contain"/>
        <div className='flex items-start space-x-2'>
        <div className='bg-[#ff0000] w-2 h-2 rounded-full mt-[4px]'/>
        <p className='flex-1 text-sm text-[#3E3D3D] font-medium'>If your total amount hit! <span className='text-black font-bold'><span className='line-through'>N</span>{numberWithCommas(freegift.price_to_pass)}</span> you will git this product <span className='text-black font-bold'>{freegift.name}</span>  worth <span className='text-black font-bold'><span className='line-through'>N</span>{numberWithCommas(freegift.naira_price)}</span> for <span className='text-black font-bold'>Free!</span></p>
        </div>
        <div className='flex items-start space-x-2'>
        <div className='bg-[#ff0000] w-2 h-2 rounded-full mt-[4px]'/>
        <p className="flex-1 text-sm text-[#3E3D3D] font-medium">The amount remaining to reach the goal is <span className='text-black font-bold animate-pulse'><span className='line-through'>N</span>{numberWithCommas(price_remains)}</span></p>
        </div>
      </div>
      <div className="w-full sm:max-w-[400px] h-[300px] overflow-hidden rounded-lg">
          <Image src={freegift.image} alt='free product' width={500} height={500} className="h-full w-full object-cover rounded-lg"/>
      </div>  
      </div>
  )
}

export default FreeGift