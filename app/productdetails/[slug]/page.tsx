import ProductDetails from "@/components/ProductDetails";
import { Item, Item2, } from "@/product";
import { Metadata, } from "next";
import { notFound } from "next/navigation";


interface props {
    params:{
        slug: string;
    }
}

export async function generateMetadata(
  { params: {slug}}: props
): Promise<Metadata> {

  const product = await fetchProduct(slug) 
 
  if(!product) return {
    title: "Not Found",
    description: "Product not found",
  }
  return {
    title: product.Meta_Title,
    description: product.Meta_description,
    alternates:{
      canonical:`/productdetails/${slug}/`
    }
  }
}

const fetchProduct = async(slug : string) => {
   const res= await fetch(`http://127.0.0.1:8000/product/${slug}`,{cache:"no-cache"})
   const data : Item = await res.json()
   return data
}



async function Page({params :{slug}}:props) {
    const product = await fetchProduct(slug)
    if(product.id == undefined)return notFound(); 
  return (
    <>
        <ProductDetails key={product.id} id={product.id} name={product.name} image={product.image} 
        description={product.description} description_span={product.description_span} price={product.price} old_price={product.old_price} cropimages={product.crop_images}/>
    </>
  )
}

export default Page


export async function generateStaticParams() {
  const res = await fetch(`http://127.0.0.1:8000/none`,{cache:"no-cache"})
  const data: Item[]= await res.json();
  if(!data) return[];
  return data.map((item) =>({
      slug: item.slug,
      
    }))
}
