'use client'
import Comments from './Comments'
import SeeMoreproduct from './SeeMoreproduct'
import { useRouter } from 'next/navigation';
import LikeCon from './LikeCon'
import Image from 'next/image';

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
  
  return (
    <div className={`mb-2 ${truecon && "w-[320px]"}`}>
        <div className='relative h-[300px] overflow-hidden mb-2 rounded-3xl'>
        <SeeMoreproduct slug={slug} images={modelimages}/>
        <div className='flex flex-col space-y-1 absolute bottom-0 left-0 pb-3 pl-3 pt-6 bg-gradient-to-t from-black w-full '>
            <h1 className='text-xs font-semibold text-[#B9B9B9]'>{name}</h1>
            <div className='flex items-center space-x-2'>
             <p className='text-lg text-white font-semibold'> <span className='line-through'>N</span>{price}K</p> 
             {old_price ? <p className='text-sm text-white/70 font-semibold line-through'>N{old_price}K</p> : <p className='text-sm text-white/70 font-semibold'>N/A</p>} 
            </div>
            
            <LikeCon id={id} details={false}/>
        </div>
        <div className={`h-[300px] ${truecon && "w-[320px]"}`}>
          <Image src={image} alt={name} width={100} height={100}
          className=' h-full w-full object-cover'/>
        </div>
        </div>
        {/* @ts-ignore */}
        <Comments id={id} details={false}/>
        <p onClick= {() => router.push(`/productdetails/${slug}`)} className='text-xs text-[#333333] font-bold text-center py-1 sm:py-2 bg-[#E7D6CE] rounded-full shadow-lg hover:shadow-none transition ease-in duration-300 cursor-pointer'>
        Check Design
        </p>
      </div>

  )
}

export default ProductItem