import IconBxsQuoteAltLeft from "./Icons/LeftQuote"
import Image from "next/image"
import TestBackground from "@/public/images/test background.png"

interface props {
    comment: string,
    image:string, 
    id:number,
    name:string
}

function Testimonial({comment, image,id,name} : props) {
  return (
    <div className="relative h-[460px] shadow-2xl overflow-hidden">
    <div className="absolute p-6 h-[300px]">
       <IconBxsQuoteAltLeft style={{color:"red", width:"60px", height:"60px"}}/>
       <p className="text-xs px-[30px] text-center">
         {comment}
       </p>
    </div>
    <div className="absolute bottom-0">
        <div className="relative mb-2">
        <Image  className="w-full object-cover scale-110 " src={TestBackground} alt="text-background"/>
          <div className="absolute top-[60%] left-[50%] -translate-y-1/2 -translate-x-1/2 space-y-2 sm:space-y-4 z-[10px] ">
            <div className="bg-[#F2F2F2] w-[150px] h-[150px] rounded-full p-1 ">
                <Image width= {100} height={100} className="w-full h-full object-contain rounded-full " src={image} alt="avater" />
            </div>
            <h3 className="text-sm font-bold text-black/70 text text-center">{name}</h3>
          </div>  
          
            
        </div>
        
    </div>
    
</div>
  )
}

export default Testimonial