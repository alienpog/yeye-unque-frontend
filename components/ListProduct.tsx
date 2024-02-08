"use client"
import SectionHeader from "./SectionHeader"
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { addproduct } from "@/src/redux/slices/bagSlice";
import { removefromlist } from '@/src/redux/slices/listSlice';
import { RootState } from '@/src/redux/store';
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";


function ListProduct() {
    const {data : session}= useSession()
    const productlist = useAppSelector((state :RootState) => state.listReducer.list);
    const dispatch = useAppDispatch();
    const lastitem2 = productlist.length -1 
    

return (
    <>
    <div className='header mt-2 lg:mt-4' id="list">  
      <SectionHeader conheader="Products in your List" red={false}/>
      <div className='relative'> 
        <div className=' absolute bottom-0 h-[64px] w-full bg-gradient-to-t from-[#F2F2F2] z-10' />
        <div className='flex items-center justify-around bg-[#E7D6CE] py-1 lg:py-2 text-xs lg:text-[16px] leading-5 lg:leading-6 font-medium'>
            <p>Product</p>
            <p>Add to Bag</p>   
        </div>
        <div className='flex flex-col h-full max-h-[450px] lg:max-h-[500px] overflow-y-scroll scrollbar-thumb-rounded-md overflow-x-auto scrollbar-thumb-[#E7D6CE] scrollbar-thin'>
          {productlist.map(({id, name, image, price, measurement},index) => (
                
                <div className={`flex items-center justify-around py-2 lg:py-4 ${ index == lastitem2? "mb-10":"mb-0"}`} key={id}>
                <div className='flex items-center justify-center space-x-2'>
                <div className='w-[64px] lg:w-[85px] overflow-hidden rounded-lg '>
                    {/* @ts-ignore */}
                    <Image src={image} alt='product' width={500} height={500} className='w-full object-cover '/>
                </div>
                <div className='flex flex-col space-y-1 lg:space-y-3' >
                    <p className='text-xs lg:text-sm text-[#5D5D5D] font-medium hidden sm:inline px-3 py-1'>{name}</p>
                    <p className='text-sm font-semibold lg:text-[16px] leading-7 px-3 py-1'><span className='line-through'>N</span>{price}</p>
                    <div className='flex items-center space-x-1 cursor-pointer py-1 px-3 hover:bg-[#E7D6CE] rounded-full transition-all duration-300 ease-in-out'
                     onClick={()=>dispatch(removefromlist(id))}>
                        <p className='text-xs lg:text-sm text-[#5D5D5D] font-medium'>Remove</p>
                        <TrashIcon className='text-[#ff0000] h-3 w-3 lg:h-4 lg:w-4'/>
                    </div>
                </div>
                </div> 
                <p className='text-xs font-semibold lg:text-[16px] leading-7 bg-[#75192A] rounded-full px-6 text-white drop-shadow-lg hover:drop-shadow-none transition-all duration-300 ease-in-out -translate-x-4 sm:-translate-x-7 cursor-pointer'
                 onClick= {() =>{session && (dispatch(addproduct({id, name, image, price, measurement})),dispatch(removefromlist(id)))}}> BUY! </p>     
            </div>
            ))}
          {productlist.length == 0  &&  <h1 className='text-xs lg:text-sm text-[#5D5D5D] font-medium text-center mt-8 mb-32 lg:mb-60'>No Product in your List</h1>}
          </div>
        </div>
      </div>

    </>
  )
}

export default ListProduct