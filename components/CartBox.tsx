'use client'
import SectionHeader from '@/components/SectionHeader'
import Image from 'next/image'
import { useAppSelector } from "../src/redux/hooks"
import { RootState } from '@/src/redux/store'
import { useAppDispatch } from "../src/redux/hooks"
import { addproduct, minusproduct, removeproduct } from '@/src/redux/slices/bagSlice'
import { TrashIcon } from '@heroicons/react/24/outline'

function CartBox() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state :RootState) => state.cartReducer.cart);
    // @ts-ignore
    const lastitem = products.items?.length -1
    const numberWithCommas = (number: number) => {
        return number.toLocaleString(); };
    
  return (
    <>
         <div className='header mt-2 lg:mt-4' id="cart">  
    <SectionHeader conheader="Products in Bag" red={false}/>
    <div className='relative'> 
        <div className=' absolute bottom-0 h-[64px] w-full bg-gradient-to-t from-[#F2F2F2] z-10' />
        <div className='flex items-center justify-around bg-[#E7D6CE] py-1 lg:py-2 text-xs lg:text-[16px] leading-5 lg:leading-6 font-medium'>
            <p>Product</p>
            <p>Quantity</p>
            <p className='hidden sm:inline'>Sub Total</p>
        </div>
        
       {products.items && (
         <div className='flex flex-col h-full max-h-[450px] lg:max-h-[500px] overflow-y-scroll scrollbar-thumb-rounded-md overflow-x-auto scrollbar-thumb-[#E7D6CE] scrollbar-thin'>
         {products.items?.map(({id,name,image,price,quantity,subprice},index) => (
         
         <div className={`flex items-center justify-around py-2 lg:py-4 ${index == lastitem? "mb-10":"mb-0"}`} key={index}>
         <div className='flex items-center justify-center space-x-2'>
             <div className='w-[64px] lg:w-[85px] overflow-hidden rounded-lg'>
             {/* @ts-ignore */}
             <Image src={image} alt='product' width={500} height={500} className='w-full object-cover '/>
             </div>
             <div className='flex flex-col space-y-1 lg:space-y-3' >
                 <p className='text-xs lg:text-sm text-[#5D5D5D] font-medium hidden sm:inline px-3 py-1 '>{name}</p>
                 <p className='text-sm font-semibold lg:text-[16px] leading-7 px-3 py-1 hidden sm:inline '><span className='line-through'>N</span>{numberWithCommas(price)}</p>
                 <p className='text-sm font-semibold lg:text-[16px] leading-7 px-3 py-1  sm:hidden'><span className='line-through'>N</span>{numberWithCommas(subprice)}</p>
                 <div onClick={() =>{dispatch(removeproduct(id))}} className='flex items-center space-x-1 cursor-pointer px-3 py-1 rounded-full hover:bg-[#E7D6CE] transition-all duration-500 ease-in-out'>
                     <p className='text-xs lg:text-sm text-[#5D5D5D] font-medium'>Remove</p>
                     <TrashIcon className='text-[#ff0000] h-3 w-3 lg:h-4 lg:w-4'/>
                 </div>
             </div>
         </div>
             
         <div className='flex items-center justify-center -translate-x-4 sm:-translate-x-16 lg:-translate-x-20 '>
             <p  onClick={() =>{dispatch(minusproduct({id,price}))}} className=' w-6 lg:w-8 text-center text-sm font-semibold py-1 lg:py-2 bg-[#E7D6CE] rounded-bl-lg cursor-pointer  shadow-md hover:shadow-none hover:text-white transition-all duration-300 ease-in-out'>-</p>
             <p className='text-sm px-2 py-1 lg:px-4 lg:py-2 font-medium'>{quantity}</p>
             <p onClick={() =>{dispatch(addproduct({id,price}))}} className=' w-6 lg:w-8 text-center text-sm font-semibold  py-1 lg:py-2 bg-[#E7D6CE] rounded-br-lg cursor-pointer  shadow-md hover:shadow-none hover:text-white transition-all duration-300 ease-in-out'>+</p>
         </div>
         <p className='hidden sm:inline text-sm font-semibold lg:text-[16px] leading-7 -translate-x-4 sm:-translate-x-7 lg:-translate-x-10'><span className='line-through'>N</span>{numberWithCommas(subprice)}</p>
         
         </div>
         ))}
     </div>
       )}
       {products.items.length == 0  &&  <h1 className='text-xs lg:text-sm text-[#5D5D5D] font-medium text-center mt-8 mb-12 lg:mb-28'>No Product in your bag</h1>}
    </div>
    </div> 
    </>
  )
}

export default CartBox