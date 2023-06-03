import ProductDetails from "@/components/ProductDetails";
import { Item, } from "@/product";
import { Metadata, } from "next";
import { notFound } from "next/navigation";


interface props {
    params:{
        id: number;
    }
}

export async function generateMetadata(
  { params: {id}}: props
): Promise<Metadata> {

  const product = await fetchProduct(id) 
 
  if(!product) return {
    title: "Not Found",
    description: "Product not found",
  }
  return {
    title: product.name,
    description: product.description,
    alternates:{
      canonical:`/productdetails/${id}/`
    }
  }
}

const fetchProduct = async(id : number) => {
   const res= await fetch(`http://127.0.0.1:8000/product/${id}/`,{next:{revalidate:60}})
   const data : Item = await res.json()
   return data
}



async function page({params :{id}}:props) {
    const product = await fetchProduct(id) 
    if(product.id == undefined )return notFound(); 
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
