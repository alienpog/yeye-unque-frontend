"use client"
import { usePathname, useRouter } from "next/navigation";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";


interface props{
  show: boolean;
  active: boolean;
}

const actions = [
  {
    "offer":"Get Your Design In 48hrs"
  },
  {
    "offer":"10% OFF Your First Oder"
  },
  {
    "offer":"Men & Kids Service available"
  },
  {
    "offer":"Delivery World Wild"
  },
  {
    "offer":"Unluck Your Inner Beauty"
  },
  {
    "offer":"Like and Comment"
  },
]

function Offers({show,active}:props ) {
  const pathname = usePathname()
  const router = useRouter()
  
  return (
    <div className={` z-30 shadow-md ${show ? "sticky top-0 py-2 bg-[#f2f2f2] md:bg-[#F2F2F2]/50 md:backdrop-blur-md ":"active bg-[#F2F2F2] sticky top-[30px] sm:top-[40px] md:top-[45px] py-1 md:py-2"}`}>
    {active && (
      <div className="hidden w-full sm:flex bg-[#E7D6CE]  text-[#010101] text-xm font-medium py-2 shadow-lg mb-2 md:hidden">
      <div className="flex max-w-lg w-full mx-auto items-center justify-center space-x-12">
          <p className={`fitter-action ${pathname =="/fashion/females" && "text-white"}`} onClick={()=>(router.push('/fashion/females'))}>Women</p>
          <p className= {`fitter-action ${pathname =="/fashion/males" && "text-white"}`} onClick={()=>(router.push('/fashion/males'))}>men</p>
          <p className= {`fitter-action ${pathname =="/fashion/kids" && "text-white"}`} onClick={()=>(router.push('/fashion/kids'))}>kid</p>
      </div>
    </div>
    )}
    
     <Swiper className="flex w-full h-full item-center justify-center py-[1px]" modules={[Autoplay]} loop={true} autoplay= {{delay:4000, }}>
      {actions.map((actions,index) =>( <SwiperSlide className='flex w-full item-center justify-center'key={index}><div className="w-full flex items-center justify-center"><h1 className="bg-[#FF0000] w-[200px] sm:w-[250px] text-center text-white rounded-md font-semibold
       text-xs md:text-sm py-1 sm:py-2" >{actions.offer}</h1></div></SwiperSlide> ))} 
    </Swiper>
    </div> 
  )
}

export default Offers


