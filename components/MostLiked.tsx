import { Item } from "@/product"
import SectionHeader from "./SectionHeader"
import ProductItem from "./ProductItem"


const quarydesign = async()=>{
 const res= await fetch('http://127.0.0.1:8000/mostliked/',{next:{revalidate: 5}})
 const data: Item[]= await res.json()
 return data
}


async function MostLiked() {
    const LikedDesign = await quarydesign()
  return (
    <div className="header">
        <SectionHeader conheader="Most Liked Design" red={false}/>
        <div className="flex items-start justify-start space-x-2 md:space-x-4 lg:space-x-8 pl-2 pb-3 sm:pl-3 md:pl-4 md:pb-5 lg:pl-6 lg:pb-6
         overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin ">
         {LikedDesign.splice(0,7).map(({id,image,price,modelimages,old_price, name})=>(
          <ProductItem key={id} id= {id} image={image} 
           price={price} modelimages={modelimages} name={name} old_price={old_price} truecon />  
         ))}
        </div>
    </div>
  )
}

export default MostLiked