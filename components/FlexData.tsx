import { Item } from "@/product"
import SectionHeader from "./SectionHeader"
import ProductItem from "./ProductItem"
import ClickSeeMoreProduct from "./ClickSeeMoreProduct"
import BACKEND_URL from "@/src/apiConfig"


interface Props{
  dataquary:string 
  producturl: string
  productname:string
}

// tate note for data queries
const quarydesign = async(dataquary : string)=>{
 const res= await fetch(`${BACKEND_URL}dataquary/${dataquary}/`,{cache:"no-cache"})
 const data: Item[]= await res.json()
 return data
}


async function FlexData({dataquary, producturl, productname}:Props) {
  // checked out
    const LikedDesign = await quarydesign(dataquary)
  return (
    <div className="header">
        <SectionHeader conheader={productname} red={false}/>
        <div className="flex items-start justify-start space-x-2 md:space-x-4 lg:space-x-8 px-2 pb-3 sm:px-3 md:px-4 md:pb-5 lg:px-6 lg:pb-6
         overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin ">
         {LikedDesign.splice(0,7).map(({id,image,price,modelimages,old_price, name, slug, measurement})=>(
          <ProductItem key={id} id= {id} image={image} 
           price={price} modelimages={modelimages} name={name} old_price={old_price} truecon  measurement={measurement} slug={slug}/>  
         ))}
         <ClickSeeMoreProduct producturl={producturl}/>
        </div>
    </div>
  )
}

export default FlexData