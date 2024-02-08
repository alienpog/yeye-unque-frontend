"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Image from 'next/image';
import BACKEND_URL from "@/src/apiConfig";
import { useAppDispatch } from "@/src/redux/hooks";
import { openprofile } from "@/src/redux/slices/openprofileSlice";
import { profileset } from "@/src/redux/slices/profileslice";
import { useRouter } from "next/navigation";

interface Product {
  id?: number;
  slug?: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  sub_price: number;
  delivery: string;
}

function ProductHistory() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const batchSize = 5;

  const loadMore = () => {
    const startIndex = displayedProducts.length;
    const endIndex = startIndex + batchSize;
    const nextBatch = products.slice(startIndex, endIndex);
    setDisplayedProducts((prevBatch) => [...prevBatch, ...nextBatch]);
  };
  const numberWithCommas = (number: number) => {
    return number.toLocaleString(); };
 
    const router = useRouter(); 
  // query product list
  useEffect(() => {
    async function queryProducts() {
      try {
        const res = await fetch(`${BACKEND_URL}productlist/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'email': session?.user?.email }),
        });
        const data = await res.json();
        setProducts(data);
        setDisplayedProducts(data.slice(0, batchSize)); // Initialize displayed products
      } catch (error) {
        // Handle error here
        console.error('Error fetching products:', error);
      }
    }
    queryProducts();
  }, []);

  const lastItem = displayedProducts.length - 1;
  const dispatch = useAppDispatch();
  return (
    <>
    {displayedProducts.map((product,index) => (
    
    <div className={`flex items-center justify-around py-2 lg:py-4 ${index == lastItem? "mb-4":"mb-0"}`} key={index}>
    <div className='flex items-center justify-center space-x-2'>
        <div className='w-[64px] lg:w-[85px] overflow-hidden rounded-lg cursor-pointer hover:opacity-50 transition-all duration-500 ease-in-out' onClick={()=>{dispatch(openprofile()),dispatch(profileset({id:product.id,slug:product.slug,image:product.image,name:product.name,quantity:product.quantity, price:product.price, totalprice:product.sub_price, delivery:product.delivery }))}}>
        {/* @ts-ignore */}
        <Image src={product.image} alt='product' width={500} height={500} className='w-full object-cover '/>
        </div>
        <div className='flex flex-col space-y-1 lg:space-y-2' >
            <p className='text-xs lg:text-sm text-[#5D5D5D] font-medium hidden sm:inline'>{product.name}</p>
            <p className='text-sm font-semibold lg:text-[16px] hidden sm:inline leading-7 '><span className='line-through'>N</span>{numberWithCommas(product.price)}</p>
            <p className='text-sm font-semibold lg:text-[16px] leading-7 sm:hidden'><span className='line-through'>N</span>{numberWithCommas(product.sub_price)}</p>
            <p className='text-xs lg:text-sm text-[#5D5D5D] font-medium'>X{product.quantity}</p>
           { product.delivery == "done" && product.id && <p onClick={()=>router.push(`/productdetails/${product.slug}/?id=${product.id}`)} className='text-xs lg:text-sm bg-[#FFEEEE] px-2 py-1 text-[#FD1F1F] font-medium animate-pulse cursor-pointer'>Drop a Review</p>}
        </div>
    </div> 
    <p className='hidden sm:inline text-sm font-semibold lg:text-[16px] leading-7 -translate-x-4 lg:-translate-x-7 '><span className='line-through'>N</span>{numberWithCommas(product.sub_price)}</p>  
    <p className={`text-xs text-center py-1 lg:py-2 font-medium text-white rounded-lg w-full max-w-[100px] ${product.delivery == "pending"? "bg-[#FFCE00] animate-pulse" : product.delivery == "done"? "bg-[#55A366] px-6 lg:px-8" :"bg-[#ff0000] px-4 lg:px-6"}`}>{product.delivery}{product.delivery == "pending" && "..."}</p>
       
</div>
))}
{displayedProducts.length < products.length && (
        <div onClick={loadMore} className="text-[#FF0000] font-semibold sm:font-bold text-xs sm:text-sm text-center shadow-lg hover:shadow-none border-2 border-[#E7D6CE]
        max-w-xs mx-auto rounded-full w-full py-1 sm:py-2  transition-all duration-300 ease-in mb-10 lg:mb-20 cursor-pointer ">Load More</div>
      )}
{products.length == 0  &&  <h1 className='text-xs lg:text-sm text-[#5D5D5D] font-medium text-center mt-8 mb-32 lg:mb-60'>No Products History</h1>}
    </>
  )
}

export default ProductHistory