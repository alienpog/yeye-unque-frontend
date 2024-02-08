import { Item } from "@/product"
import SectionHeader from "./SectionHeader"
import ProductItem from "./ProductItem"
import BACKEND_URL from "@/src/apiConfig"


const quarydesign = async()=>{
 const res= await fetch(`${BACKEND_URL}dataquary/mendesign/`,{cache:"no-cache"})
 const data: Item[]= await res.json()
 console.log(data)
 return data
}


async function SpecialForYou() {
  // checked out
    const LikedDesign = await quarydesign()
  return ( 
    <div className="header relative hidden sm:block">
        <SectionHeader conheader="Special for You" red={false}/>
        <div className="absolute top-0 h-[430px] w-6 right-0 bg-gradient-to-l from-[#F2F2F2] z-10"/>
        <div className="flex items-start justify-start space-x-2 md:space-x-4 lg:space-x-8 px-2 pb-3 sm:px-3 md:px-4 md:pb-5 lg:px-6 lg:pb-6
         overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin  sm:max-w-[350px] md:max-w-[400px] lg:max-w-[580px]">  
         {LikedDesign?.splice(0,7).map(({id,image,price,modelimages,old_price, name, measurement, slug})=>(
          <ProductItem key={id} id= {id} image={image} 
           price={price} modelimages={modelimages} name={name} old_price={old_price} measurement={measurement} truecon slug={slug}/>  
         ))}
        </div>
    </div>
  )
}

export default SpecialForYou