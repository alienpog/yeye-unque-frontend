'use client'; // Error components must be Client Components
 
import MiniCon from '@/components/MiniCon';
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <MiniCon>
    <div className='min-h-[100svh] grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto items-center justify-center gap-12 md:gap-24'>
        <img src='/images/no_data@4x.png' width={100} height={100} alt='error'className='w-full h-full object-contain'/>
      <div className='flex flex-col space-y-4 md:space-y-8 text-left'>
        <h2 className='text-2xl md:text-5xl text-black font-bold'>Something went wrong!</h2>
        <div className="text-xs text-[#9C0F0F] font-bold py-2 px-6 border-2 border-[#E7D6CE]  
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer w-64 animate-pulse"onClick={()=>reset()}>
        Try again
        </div>
    </div>
    </div>
    </MiniCon>
  );
}