import ProductDetails from "@/components/ProductDetails";
import { Item, } from "@/product";

interface props {
    params:{
        id: number;
    }
}

 
const fetchProduct = async(id : number) => {
   const res= await fetch(`http://127.0.0.1:8000/product/${id}/`,{next:{revalidate:5}})
   const data : Item = await res.json()
   return data
}


async function page({params :{id}}:props) {
    const product = await fetchProduct(id)
  return (
    <>
        <ProductDetails key={product.id} id={product.id} name={product.name} image={product.image} 
        description={product.description} price={product.price} old_price={product.old_price} cropimages={product.crop_images}/>
    </>
  )
}

export default page


export async function generateStaticParams() {
  const res = await fetch(`http://127.0.0.1:8000/product/none/`)
  const data: Item[] = await res.json();
  return data.map((item) =>({
      id: item.id.toString()
    }))
}
