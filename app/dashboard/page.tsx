"use client"
import { useSession } from "next-auth/react"; 
import SectionHeader from '@/components/SectionHeader';
import FreeGift from '@/components/FreeGift';
import ListProduct from '@/components/ListProduct';
import UserAmount from '@/components/UserAmount';
import ProductHistory from "@/components/ProductHistory";



function page() {
  
  const { data : session } = useSession()

  if (!session) {
    return<div className=" w-full h-screen ">
              <img src="/images/logo-animi-red.gif" className="h-24 object-contain absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4" alt="loader"/>
          </div>; 
  }
  else{
  return (
    <div className='flex flex-col gap-2 lg:gap-6 my-2 lg:my-4'>
      <div className='header mt-2 lg:mt-4'>
     <UserAmount/>
    <SectionHeader conheader="Products History" red={false}/>
    <div className='relative'> 
        <div className=' absolute bottom-0 h-[32px] lg:h-[64px] w-full bg-gradient-to-t from-[#F2F2F2] z-10' />
        <div className='flex items-center justify-around bg-[#E7D6CE] py-1 lg:py-2 text-xs lg:text-[16px] leading-5 lg:leading-6 font-medium'>
            <p>Product</p>
            <p className='hidden sm:inline'>Price</p>
            <p>Delivery</p>   
        </div>
        <div className='flex flex-col h-full max-h-[300px] lg:max-h-[360px] overflow-y-scroll scrollbar-thumb-rounded-md overflow-x-auto scrollbar-thumb-[#E7D6CE] scrollbar-thin'>
           <ProductHistory/>
          </div>
    </div>
      </div>
      <ListProduct/>
      <FreeGift/>
    </div>
  )}
}

export default page