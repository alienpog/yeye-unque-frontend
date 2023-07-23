'use client'
import Comments from './Comments'
import SeeMoreproduct from './SeeMoreproduct'
import { useRouter } from 'next/navigation';
import LikeCon from './LikeCon'
import Image from 'next/image';
import { ClassicSpinner } from "react-spinners-kit";
import { useState } from 'react';

interface props {
  name: string,
  image: string,
  price: number,
  old_price: number | null,
  id: number,
  modelimages?: string[],
  truecon:boolean,
  slug?: string
}

function ProductItem({id, name, image, price, modelimages, old_price, slug, truecon }: props){
  const router = useRouter();
  const [loading, Setloading]= useState(false)
  console.log("img>>>>>>",image)
  return (
    <div className={`mb-2 ${truecon && "w-[320px]"}`}>
        <div className='relative h-[300px] overflow-hidden mb-2 rounded-3xl'>
        <SeeMoreproduct slug={slug} images={modelimages}/>
        <div className='flex flex-col space-y-1 absolute bottom-0 left-0 pb-3 pl-3 pt-6 bg-gradient-to-t from-black w-full '>
            <h1 className='text-xs text-white/70'>{name}</h1>
            <div className='flex items-center space-x-2'>
             <p className='text-lg text-white font-semibold'> <span className='line-through'>N</span>{price}K</p> 
             {old_price ? <p className='text-sm text-white/70 font-semibold line-through'>N{old_price}K</p> : <p className='text-sm text-white/70 font-semibold'>N/A</p>} 
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
          {loading?<ClassicSpinner size={15} color="black"/>:"Check Design"}
          </p>
          <p onClick= {() =>{}} className=' w-full flex justify-center items-center text-xs text-[#333333] font-bold text-center py-1 sm:py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300 cursor-pointer'>
          Keep
          </p>
          <p onClick= {() =>{}} className=' w-full flex justify-center items-center text-xs text-[#ffffff] font-bold text-center py-1 sm:py-2 bg-[#9C0F0F] rounded-full drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300 cursor-pointer'>
          Buy
          </p>
        </div>
        
      </div>

  )
}

export default ProductItem