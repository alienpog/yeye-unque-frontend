import { Item } from "@/product"
import BACKEND_URL from "@/src/apiConfig";
import { ImageResponse } from "next/server";


export const size ={
    width : 400,
    height : 600,

};
export const contentType = "images/png";

interface props {
    params:{
        slug: string
    }
}


async function fetchDeta (slug : string) {
    const res = await fetch(`${BACKEND_URL}product/${slug}`, { cache:"no-cache"});
    const data : Item = await res.json();
    return data
}
 


 async function og({params :{slug}}:props){
    const product = await fetchDeta(slug);
    return new ImageResponse((
      <div tw="retative flex items-center justify-center">
        <img src={product.image} alt={product.name} tw=" w-full object-contain"/>
        <div tw="absolute flex items-center -bottom-[25px] w-full bg-[#ff0000] py-1">
            <p tw="text-white text-lg flex font-bold  m-5">{product.name}</p>
        </div>
      </div>
    ),size)
    
}
export default og