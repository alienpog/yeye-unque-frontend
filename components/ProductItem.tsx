'use client'
import Comments from './Comments'
import SeeMoreproduct from './SeeMoreproduct'
import { usePathname, useRouter } from 'next/navigation';
import LikeCon from './LikeCon'
import Image from 'next/image';
import { ClassicSpinner } from "react-spinners-kit";
import { useState } from 'react';
  import { useAppDispatch, useAppSelector } from "../src/redux/hooks";
import { addproduct } from '@/src/redux/slices/bagSlice';
import { useSession } from 'next-auth/react';
import { addtolist } from '@/src/redux/slices/listSlice';
import { RootState } from '@/src/redux/store';
import { loginopen } from '@/src/redux/slices/loginSlice';

interface props {
  name: string,
  image: string,
  price: number,
  old_price: number | null,
  id: number,
  modelimages?: string[],
  truecon:boolean,
  slug?: string,
  measurement: boolean,
}

function ProductItem({id, name, image, price, modelimages, old_price, slug, truecon, measurement }: props){
  
  const carts = useAppSelector((state :RootState) => state.cartReducer.cart.items);
  const lists = useAppSelector((state :RootState) => state.listReducer.list);
  
  const keep = lists.some(product => product.id === id);
  const buy = carts.some(product => product.id === id);
  
  const pathname = usePathname()
  const router = useRouter();
  const [loading, Setloading]= useState(false)
  const dispatch = useAppDispatch();
  const {data: session}= useSession();
  
  const numberWithCommas = (number: number) => {
    return number?.toLocaleString(); };
  return (
    <div className={`mb-2 ${truecon && "w-[320px]"}`}>
        <div className='relative h-[300px] overflow-hidden mb-2 rounded-3xl'>
        <SeeMoreproduct slug={slug} images={modelimages}/>
        <div className='flex flex-col space-y-1 absolute bottom-0 left-0 pb-3 pl-3 pt-12 bg-gradient-to-t from-black w-full '>
            <h1 className='text-xs font-normal drop-shadow-sm text-[#ffff]'>{name}</h1>
            <div className='flex items-center space-x-2'>
            <p className='text-lg text-white font-semibold'> <span className='line-through'>N</span>{numberWithCommas(price)}</p> 
            {old_price ? <p className='text-sm text-white/60 font-medium line-through'>N{numberWithCommas(old_price)}</p> : <p className='text-sm text-white/70 font-semibold'>N/A</p>} 
            </div>
            
            <LikeCon id={id} details={false}/>
        </div>
        <div className={`h-[300px] ${truecon && "w-[320px]"}`} onClick= {() =>{router.push(`/productdetails/${slug}`),Setloading(true)}}>
          <Image src={image} alt={name} width={500} height={500} placeholder='blur' blurDataURL='URL'
          className=' h-full w-full object-cover'/>
        </div>
        </div>
        {/* @ts-ignore */}
        <Comments id={id} details={false}/>
        <div className='flex items-center justify-center gap-2'>
          <p onClick= {() =>{router.push(`/productdetails/${slug}`),Setloading(true)}} className='w-full flex justify-center items-center text-xs text-[#333333] font-bold text-center py-1 sm:py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300 cursor-pointer'>
          {loading?<ClassicSpinner size={15} color="black"/>:"Check"}
          </p>
          {!keep && <p onClick= {() =>{session? dispatch(addtolist({id, name, image, price, measurement})): dispatch(loginopen())}} className=' w-full flex justify-center items-center text-xs text-[#333333] font-bold text-center py-1 sm:py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300 cursor-pointer'>
          Keep
          </p>}
          <p onClick= {() =>{session? buy? router.push("/add-bag"): dispatch(addproduct({id, name, image, price, measurement})): dispatch(loginopen())}} className={`w-full flex justify-center items-center text-xs font-bold text-center py-1 sm:py-2 ${buy?"bg-[#E7D6CE] text-[#333333]": "bg-[#9C0F0F] text-[#ffffff]" } rounded-full drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300 cursor-pointer`}>
           {buy? "Go Bag":"Buy"}
          </p>
        </div>
        
      </div>

  )
}

export default ProductItem