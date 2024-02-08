'use client'
import { Sacramento } from 'next/font/google';
import { useRef, useState } from "react";
import MiniCon from './MiniCon';
import Comments from './Comments';
import LikeCon from './LikeCon';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { addtolist } from '@/src/redux/slices/listSlice';
import { addproduct } from '@/src/redux/slices/bagSlice';
import { RootState } from '@/src/redux/store';
import { loginopen } from '@/src/redux/slices/loginSlice';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import ImageMagnifier from './ImageMagnifier';
import { useSession } from 'next-auth/react';


const sacramento = Sacramento({
    weight: '400',
    subsets: [ 'latin-ext','latin']
  });

  interface Item {
    id: number;
    name: string;
    price: number;
    old_price: number | null;
    description_span?: string;
    description: string;
    image: string;
    video?: string,
    cropimages?: string[];
    measurement:boolean;
  }
  
  function ProductDetails({
    id,
    name,
    image,
    description,
    description_span,
    price,
    old_price,
    cropimages,
    measurement,
    video,
  }: Item) {
    const router =useRouter()
    const [activeImage, setActiveImage] = useState(image);
    const [play, setPlay]=useState<boolean>(false)
    const dispatch = useAppDispatch();
    const {data: session}= useSession();
    const [click, setClick]= useState("image")

    const vidref = useRef<any>(null)

    const carts = useAppSelector((state :RootState) => state.cartReducer?.cart?.items);
    const lists = useAppSelector((state :RootState) => state.listReducer?.list);

    const keep = lists.some(product => product.id === id);
    const buy = carts.some(product => product.id === id);
    
    const numberWithCommas = (number: number) => {
      return number?.toLocaleString(); };

    const videohandle =()=>{
      setPlay((prev)=>!prev)
      if (play){
        vidref.current.pause();
    }else{
        vidref.current.play();
      }
    }
    return (
      <MiniCon>
        <div className='max-w-4xl mx-auto sm:h-[100svh] mt-4'>
        <h1 className={`${sacramento.className} text-lg md:text-2xl capitalize`}>{name}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 items-start sm:gap-10'>
        <div className=''>
        {video && video != "https://yeyeproductimages.s3.amazonaws.com/undefined" && 
        <div className='flex item-center justify-start gap-2 mb-2'>
          <p className={`hover:bg-[#E7D6CE] py-1 text-[10px] 
          px-4 rounded-full justify-center items-center transition duration-500 ease-in-out cursor-pointer ${click == "image" && "bg-[#E7D6CE]"}`} onClick={()=>{setClick("image")}}>Images</p>
          <p className= {`hover:bg-[#E7D6CE] py-1 text-[10px]
          px-4 rounded-full justify-center items-center transition duration-500 ease-in-out cursor-pointer ${click == "video" && "bg-[#E7D6CE]"}`} onClick={()=>{setClick("video")}}>Video</p>
        </div>}
            {click == "image" && <div>
            <ImageMagnifier src={activeImage} height ="400px" width='100%' alt ={name + id}/>
            <div className='flex space-x-2 items-center justify-start h-130 mt-2 overflow-y-hidden overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin'>
              <Image src={image} alt={`${name}${id}`} width={1000} height={1000} placeholder='blur' blurDataURL='URL'
              className='small-image'
              onClick={()=>{setActiveImage(image)}}/>
              
            <>
                {cropimages?.map((cropImage: string, index: number) => (
                <Image
                    key={index}
                    src={cropImage}
                    alt={`${name}${id}`}
                    height={500}
                    width={500}
                    placeholder='blur' blurDataURL='URL'
                    className='small-image'
                    onClick={()=>{setActiveImage(cropImage)}}/>
                ))}
            </>
            </div>
          </div>}
         {click == "video" && <div className='relative w-full h-full '>
         <div className={`absolute h-full w-full flex justify-center items-center rounded-lg ${!play && "bg-black/40"} transition-all duration-500 ease-in-out`}>
          <div className='z-10 cursor-pointer ' onClick={()=>videohandle()}>
           {play? <PauseCircleIcon className='h-16 w-16 opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out' color="#E8D7D0"/> : <PlayCircleIcon className='h-16 w-16' color="#E8D7D0"/>}
          </div>
          </div>
         <video className=" w-full max-h-[470px] object-cover rounded-lg" ref={vidref} autoPlay={false} controls={false} playsInline loop={true} >
         {/* @ts-ignore */}
         <source src={video} type="video/webm" />
         Your browser does not support the video tag.
        </video>
          </div>}
        </div>
        <div className={`flex flex-col h-full ${video && "sm:mt-6"}`}>
           <div className='flex-1'>
            <div className='flex flex-col-reverse sm:flex-col gap-2 sm:gap-3 mt-2 sm:mt-0'>
            <p className='text-[11px] md:text-sm text-[#323232]'>
            {description}
            <span className='text-black font-semibold'>{" "}{description_span}</span>
            </p>
            <LikeCon id={id} details/>
            </div>
            <Comments id={id} details/>
            </div>
            
            <div className='flex space-x-1 items-center justify-start md:space-x-2 lg:space-x-3 mb-[6px] md:mb-[12px]' >
                <span className='text-[#BC917F] text-[11px] md:text-[16px]'>price:</span>
                <div className='flex items-center space-x-4'>
                 <h2 className='text-sm font-bold text-black lg:text-lg'> <span className='line-through'>N</span>{numberWithCommas(price)}</h2>
                 {old_price && <h2 className='text-sm font-bold text-black/50 lg:text-lg line-through'>N{numberWithCommas(old_price)}</h2>}
                </div>     
            </div> 
            <div className='flex items-center justify-start gap-4 max-w-[200px]'>
            {!keep &&  <div onClick= {() =>{session? dispatch(addtolist({id, name, image, price, measurement})): dispatch(loginopen())}} className=" w-full text-xs bg-[#E8D7D0] text-black font-bold py-2 px-6 max-w-[150px]
                rounded-full text-center drop-shadow-md hover:drop-shadow-none transition-all duration-300 ease-in-out cursor-pointer mb-2 ">
                Keep
            </div>}
            <div onClick= {() =>{session? buy? router.push("/add-bag/?#cart"): dispatch(addproduct({id, name, image, price, measurement})): dispatch(loginopen())}}  className={`w-full text-xs  font-bold py-2 px-6 max-w-[150px]
                rounded-full text-center drop-shadow-md hover:drop-shadow-none ${buy?"bg-[#E7D6CE] text-[#333333]": "bg-[#9C0F0F] text-[#ffffff]" } rounded-full drop-shadow-lg hover: transition-all duration-300 ease-in-out cursor-pointer mb-2 `}>
                {buy? "Go Bag":"Buy"}
            </div> 

            </div>
              
        </div>
      </div>
        </div>
    </MiniCon>
    );
  }
  
  export default ProductDetails;
  