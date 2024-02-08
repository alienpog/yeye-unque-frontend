"use client"

import { usePathname, useRouter } from "next/navigation";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BACKEND_URL from "@/src/apiConfig";
import Image from "next/image";
import { ClassicSpinner } from "react-spinners-kit";


interface props{
  show: boolean;
  active: boolean;
  search: boolean;
}

function Offers({show,active,search}:props ) {
  const pathname = usePathname()
  const router = useRouter()
  const {data : session} = useSession()
  
  const actions = [
    {"offer":`${session ? "Welcome " + session?.user?.name :"Login for Better Experience"}`}
    ,
    {
      "offer":"Get Your Design In 48hrs"
    },
    {
      "offer":"Apply Coupon and Get 10% OFF"
    },
    {
      "offer":"Men & Kids Service Available"
    },
    {
      "offer":"Delivery WorldWide"
    },
    {
      "offer":"Since 1989"
    },
    {
      "offer":"Unluck Your Inner Beauty"
    },
    {
      "offer":"Like and Drop Reviews"
    },
  ]
    // input search navigation
 const [Post, setPost] = useState("")
 
 const [dataquery, setDataquery] = useState<any[]>([]);

 useEffect(() => {
   async function getSearch() {
     const res = await fetch(`${BACKEND_URL}querysearchproducts/${Post}`);
     const data = await res.json();
     if (res.status === 200)
         setDataquery(data);
   }
   getSearch();
 }, [Post]);
  
  //  seachquery
  const seachquery = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(!Post) return;
    const query = Post.trim()
    router.push(`/fashion/${query}`)
    setPost("")
  }

  // const [productid, setProductid] = useState(null)

  const numberWithCommas = (number: number) => {
    return number?.toLocaleString(); };

  return (
    <div className={` z-30 shadow-md ${show ? "sticky top-0 py-2 bg-[#f2f2f2] md:bg-[#F2F2F2]/50 md:backdrop-blur-md ":"active bg-[#F2F2F2] sticky top-[30px] sm:top-[40px] md:top-[45px] py-1 md:py-2"}`}>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    {active && (
      <div className="w-full bg-[#E7D6CE] font-semibold text-[#333333] text-xs lg:text-sm py-3 mb-1">
      <div className="flex max-w-6xl w-full mx-auto items-center justify-center space-x-6  lg:space-x-8">
          <p className= {`fitter-action ${pathname =="/fashion/female" && "text-white"}`} onClick={()=>(router.push('/fashion/female'))}>women-design</p>
          <p className= {`fitter-action ${pathname =="/fashion/male" && "text-white"}`} onClick={()=>(router.push('/fashion/male'))}>men-design</p>
          <p className= {`fitter-action ${pathname =="/fashion/kids" && "text-white"}`} onClick={()=>(router.push('/fashion/kids'))}>kids-design</p>
          <p className= {`fitter-action ${pathname =="/fashion/men-shoes" && "text-white"}`} onClick={()=>(router.push('/fashion/men-shoes'))}>men-shoe</p>
          <p className= {`fitter-action ${pathname =="/fashion/men-caps" && "text-white"}`} onClick={()=>(router.push('/fashion/men-caps'))}>men-cap</p>
          <p className= {`fitter-action ${pathname =="/fashion/Jewelleries" && "text-white"}`} onClick={()=>(router.push('/fashion/Jewelleries'))}>Jewelleries</p>
          <p className= {`fitter-action ${pathname =="/fashion/wristwatches" && "text-white"}`} onClick={()=>(router.push('/fashion/wristwatches'))}>watches</p>
          <p className= {`fitter-action ${pathname =="/fashion/women-bags" && "text-white"}`} onClick={()=>(router.push('/fashion/women-bags'))}>women-bag</p>
      </div>
    </div>
    )}
    {!active &&
      <Swiper className={`flex w-full item-center justify-center py-[1px] ${!search? 'opacity-1 h-full':'opacity-0 h-0'} transition-all duration-300 ease-in-out `} modules={[Autoplay]} loop={true} autoplay= {{delay:4000, }}>
      {actions.map((actions,index) =>( <SwiperSlide className='flex w-full item-center justify-center'key={index}><div className="w-full flex items-center justify-center"><h1 className="bg-[#9C0F0F] px-2 w-[200px] sm:w-[250px] truncate text-center text-white rounded-md font-semibold
      text-xs md:text-sm py-1 sm:py-2 " >{actions.offer}</h1></div></SwiperSlide> ))} 
    </Swiper>
    }
     
    <form className={`w-full flex " ${search? 'opacity-1 h-[32px] sm:h-[42px] ':'opacity-0 h-0'} transition-all duration-300 ease-in-out `} onSubmit={seachquery}>
        <div className='w-full h-full max-w-3xl mx-2 sm:mx-4 md:mx-auto md:max-w-2xl flex items-center justify-center space-x-1'>
        <div className="py-1 sm:py-2 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-l-md sm:rounded-l-lg border-2 border-[#E8D7D0]">
        <MagnifyingGlassIcon className="w-3 object-contain mr-1 text-red-300"/>
        <input type="text" value={Post} onChange={(e)=>{setPost(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 placeholder:text-[11px] focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Seach Design, Brand and Categories" />
        </div>
        <button type='submit' disabled={!Post} className="flex bg-[#E8D7D0] rounded-r-md sm:rounded-r-lg h-full w-9 md:w-10 justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed hover:text-white transition-all duration-500 ease-in-out">
         <MagnifyingGlassIcon className="w-4 h-4"/></button>
        </div>
    </form>
    {dataquery.length > 0 && search && <div className='absolute top-10 md:top-[50px] left-0 z-40 w-full'>
      <div className={`max-w-[650px] mx-auto ${dataquery && "max-h-[300px] bg-[#F2F2F2]"} overflow-y-scroll scrollbar-thumb-rounded-md overflow-x-auto scrollbar-thumb-[#E7D6CE] scrollbar-thin px-2 py-1 rounded-b-lg drop-shadow-lg space-y-3 md:space-y-6 md:px-5 md:py-4`}>
        {dataquery?.map((data: any) => (
          <div key={data.id} className=' relative flex flex-row space-x-2 hover:opacity-50 transition-all duration-500 ease-in-out cursor-pointer' onClick={()=>{router.push(`/productdetails/${data.slug}`),setPost(""),setDataquery([])}}>
            {/* {productid == data.id && <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center"> <ClassicSpinner size={15} color="black"/></div>} */}
            <div className='h-[40px] w-[60px] rounded-lg overflow-hidden'>
              <Image src={data.image} alt='image' width={300} height={300} className='w-full h-full object-cover' />
            </div>
            <p className='text-xs font-medium text-[#3F3F3F]'>{data.name}</p>
            <p className='flex-1 text-xs font-bold text-[#ff0000] text-right'><span className='line-through'>N</span>{numberWithCommas(data.price)}</p>
          </div>
        ))}
      </div>
    </div>}
    </div> 
  )
}

export default Offers


