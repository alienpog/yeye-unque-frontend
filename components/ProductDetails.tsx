'use client'
import { Sacramento } from 'next/font/google';
import { useState } from "react";
import Image from "next/image"
import MiniCon from './MiniCon';
import Comments from './Comments';
import LikeCon from './LikeCon';
import { useRouter } from 'next/navigation';

const sacramento = Sacramento({
    weight: '400',
    subsets: [ 'latin-ext']
  });

  interface Item {
    id: number;
    name: string;
    price: number;
    old_price: number | null;
    description: string;
    image: string;
    cropimages?: string[];
  }
  
  function ProductDetails({
    id,
    name,
    image,
    description,
    price,
    old_price,
    cropimages,
  }: Item) {
    const router =useRouter()
    const [activeImage, setActiveImage] = useState(image);
    return (
      <MiniCon>
        <div className='max-w-5xl mx-auto sm:h-[100svh] mt-4'>
        <h1 className={`${sacramento.className} text-xs md:text-lg`}>{name}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 items-start gap-x-8'>
        
        <div>
            
            <div className='' >
            <img
                src={activeImage}
                alt={`${id}.${name}`}
                className=" w-full max-h-[400px]"
            />
            </div>
            <div className='flex space-x-2 items-center justify-start h-130 mt-2 overflow-y-hidden overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin'>
            <img src={image} alt={`${id}.${name}`} width={100} height={100} loading='lazy'
            className='small-image'
            onClick={()=>{setActiveImage(image)}} />
            
            <>
                {cropimages?.map((cropImage: string, index: number) => (
                <img
                    key={index}
                    src={cropImage}
                    alt={`${id}.${name}`}
                    height={100}
                    width={100}
                    loading='lazy'
                    className='small-image'
                    onClick={()=>{setActiveImage(cropImage)}}/>
                ))}
            </>
            </div>
        </div>
        <div className='flex flex-col h-full '>
           <div className='flex-1'>
            <div className='flex flex-col-reverse sm:flex-col gap-2 sm:gap-3 mt-2 sm:mt-0'>
            <p className='text-[11px] md:text-sm text-[#323232]'>
            {description}
            <span className='text-black font-semibold'>Hello</span>
            </p>
            <LikeCon id={id} details/>
            </div>
            <Comments id={id} details/>
            </div>
            
            <div className='flex space-x-1 items-center justify-start md:space-x-2 lg:space-x-3 mb-[6px] md:mb-[12px]' >
                <span className='text-[#BC917F] text-[11px] md:text-[16px]'>price:</span>
                <div className='flex items-center space-x-4'>
                  <h2 className='text-sm font-bold text-black lg:text-lg'> <span className='line-through'>N</span>{price}K</h2>
                 {old_price && <h2 className='text-sm font-bold text-black/50 lg:text-lg line-through'>N{old_price}K</h2>}
                </div>     
            </div> 
            <div className="text-xs bg-[#FF0000] text-white font-medium py-2 px-6 max-w-[150px]
                rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer mb-2 " onClick={()=>{router.push('/contact-us')}}>
                Contact Us
            </div>   
        </div>
      </div>
        </div>
    </MiniCon>
    );
  }
  
  export default ProductDetails;
  