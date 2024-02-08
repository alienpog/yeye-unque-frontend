'use client'

import { ViewfinderCircleIcon } from '@heroicons/react/24/solid'
import {openProduct} from "@/src/redux/slices/productSlice";
import {openitem} from "@/src/redux/slices/openSlice";
import { useAppDispatch } from '@/src/redux/hooks'

interface props {
    slug?:string,
    images?:string[]
}
function SeeMoreproduct({slug,images} : props) {
    const dispatch = useAppDispatch();

    function open(){
        dispatch(openProduct({slug,images}))
        dispatch(openitem())
    }
  return (
    <div className='group absolute top-0 right-0 '>
    <div >
      <div className='pt-3 pr-3 pl-2 pb-1 bg-[#E7D6CE] rounded-bl-2xl rounded-tr-3xl drop-shadow-md'>
        <ViewfinderCircleIcon className='w-6 h-6 text-black cursor-pointer rounded-md animate-bounce' onClick={open}/>
      </div>
    </div>
    <div className='opacity-0 group-hover:opacity-100 -translate-y-[26px] text-white bg-[#9C0F0F] text-[8px] text-center rounded-bl-2xl shadow-lg px-1 py-1 mt-2 font-semibold transition-opacity duration-500 ease-in-out cursor-pointer' onClick={open} >view</div>
    </div> 
  )
}

export default SeeMoreproduct