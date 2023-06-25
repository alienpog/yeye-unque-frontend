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
    <div className='absolute top-0 right-0 pt-3 pr-3 pl-1 pb-1 bg-[#E7D6CE]'>
        <ViewfinderCircleIcon className='w-6 h-6 text-black hover:text-white transition ease-in-out duration-300 cursor-pointer rounded-md animate-bounce' onClick={open}/>
    </div> 
  )
}

export default SeeMoreproduct