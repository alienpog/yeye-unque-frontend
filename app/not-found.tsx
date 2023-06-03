"use client"
import MiniCon from '@/components/MiniCon';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter()
  return (
    <MiniCon>
    <div className='min-h-[100svh] grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto items-center justify-center gap-12 md:gap-24'>
        <img src='/images/404@4x.png' width={100} height={100} alt='404'className='w-full h-full object-contain'/>
        <div className='flex flex-col space-y-4 md:space-y-8 text-left'>
        <h2 className='text-2xl md:text-5xl text-black font-bold'>PAGE NOT FOUND</h2>
        <div className="text-xs text-white bg-[#ff0000] font-bold py-2 px-6 rounded-full text-center shadow-md hover:shadow-none
         transition-all duration-300 ease-in-out cursor-pointer w-64 animate-pulse" onClick={()=>router.push('/fashion/allproducts')}>
        All Design
        </div>
    </div>
    </div>
    </MiniCon>
  );
}