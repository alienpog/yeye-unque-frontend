'use client'
import { ViewfinderCircleIcon } from '@heroicons/react/24/solid'
import {openProduct} from "@/src/redux/slices/productSlice";
import {openitem} from "@/src/redux/slices/openSlice";
import { useAppDispatch } from '@/src/redux/hooks'

interface props {
    id:number,
    images?:string[]
}
function SeeMoreproduct({id,images} : props) {
    const dispatch = useAppDispatch();

    function open(){
        dispatch(openProduct({id,images}))
        dispatch(openitem())
    }
  return (
     <ViewfinderCircleIcon className='w-6 h-6 absolute top-4 right-4 text-white hover:text-[#ff0000] transition ease-in-out duration-300 cursor-pointer animate-bounce' onClick={open}/>
  )
}

export default SeeMoreproduct