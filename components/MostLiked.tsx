import { Item } from "@/product"
import SectionHeader from "./SectionHeader"
import ProductItem from "./ProductItem"


const quarydesign = async()=>{
 const res= await fetch(`${process.env.BACKEND_URL}/mostliked/`,{ next:{revalidate:60*60*24}})
 const data: Item[]= await res.json()
 return data
}


async function MostLiked() {
  // checked out
    const LikedDesign = await quarydesign()
  return (
    <div className="header">
        <SectionHeader conheader="Most Liked Design" red={false}/>
        <div className="flex items-start justify-start space-x-2 md:space-x-4 lg:space-x-8 px-2 pb-3 sm:px-3 md:px-4 md:pb-5 lg:px-6 lg:pb-6
         overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin ">
         {LikedDesign.splice(0,7).map(({id,image,price,modelimages,old_price, name, slug})=>(
          <ProductItem key={id} id= {id} image={image} 
           price={price} modelimages={modelimages} name={name} old_price={old_price} truecon slug={slug}/>  
         ))}
        </div>
    </div>
  )
}

export default MostLiked