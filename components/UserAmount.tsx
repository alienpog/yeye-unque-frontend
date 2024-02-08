"use client"
import MiniCon from '@/components/MiniCon';
import { useSession } from "next-auth/react"; 
import { useEffect, useState } from 'react';
import { RootState } from '@/src/redux/store';
import { useAppSelector } from '@/src/redux/hooks';
import BACKEND_URL from '@/src/apiConfig';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function UserAmount() {

const { data : session } = useSession()
const [number, setNumber] = useState(0)
const [show, setShow] =useState(false);

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


  const numberWithCommas = (number : any) => {
    return number.toLocaleString(); // Automatically adds commas as per user's locale
  }; 
  return (
    <>
      <MiniCon>
        <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-2 text-xs lg:text-[14px] font-medium'>
          <img src={session?.user?.image || "/images/Avatar-Profile-PNG.png"} alt="client-photo" className='w-[32px] h-[32px] lg:w-[44px] lg:h-[44px] object-cover rounded-full'/>
          <div>
            <p className='text-black font-semibold'>{session?.user?.name}</p>
            <p className='text-[#5D5D5D] sm:hidden'>Total Amount Spent:{show? <span className='font-bold text-black text-sm'> <span className='line-through'>N</span>{numberWithCommas(number)}</span> : <span className='font-bold text-sm'>{"  "}<span className='line-through'>N</span>---,---</span>}</p>
          </div>
        </div>
          
        <div className='flex items-center gap-4'>
          <div onClick={()=>{setShow((prev)=> !prev)}} className='cursor-pointer'>
          {show?<EyeSlashIcon className='w-6 h-6 text-[#5D5D5D]'/>:<EyeIcon className='w-6 h-6 text-[#5D5D5D]'/>}
          </div>
          <p className='text-xs font-medium text-[#5D5D5D] hidden sm:inline'>Total Amount Spent:{show? <span className='font-bold text-black text-sm'> <span className='line-through'>N</span>{numberWithCommas(number)}</span> : <span className='font-bold text-sm'>{"  "}<span className='line-through'>N</span>---,---</span>}</p>
        </div>
      </div>
      </MiniCon>  
    </>
  )
}

export default UserAmount