import MiniCon from '@/components/MiniCon';

export default function NotFound() {
  return (
    <MiniCon>
    <div className='min-h-[100svh] grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto items-center justify-center gap-12 md:gap-24'>
        <img src='/images/404@4x.png' width={100} height={100} alt='404'className='w-full h-full object-contain'/>
        <div className='flex flex-col space-y-4 md:space-y-8 text-left'>
          <h2 className='text-2xl md:text-5xl text-[#ff0000] font-bold'>DESIGN NOT FOUND</h2>
          <p className='text-xs md:text-sm text-black animate-bounce'>Please Scroll down to See More Design</p>
        </div>
    </div>
    </MiniCon>
  );
}