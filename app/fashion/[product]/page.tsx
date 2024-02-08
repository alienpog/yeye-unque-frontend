'use client'

import MiniCon from '@/components/MiniCon';
import ProductItem from '@/components/ProductItem';
import TwoButtons from '@/components/TwoButtons';
import { Item2 } from '@/product';
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeader from '@/components/SectionHeader';
import BACKEND_URL from '@/src/apiConfig';

interface props{
  params:{
    product: string
  }
}

function Products({params:{product}}:props){
  const [products, Setproduct] = useState<Item2>()
  const [isLoading, setIsLoading]=useState(true)
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const router= useRouter()

  // changing the url backend later
  useEffect(()=>{
    const queryproducts = async() => {
      // http://yeye-unique-backend-production.up.railway.app/
      if(page ==  BACKEND_URL +product+'/'){
        return  (page.replace( BACKEND_URL + product +'/',''),
                 router.replace('/fashion/'+product)
        )          
      }
      const url = page? BACKEND_URL + product + "/?page="+ page :  BACKEND_URL + product;
      const res = await fetch(url);
      const data  = await res.json();
      Setproduct(data)
      setIsLoading(false)
    }
    queryproducts();
  },[searchParams])

  if (isLoading)
  return( 
    <div className=" w-full h-screen">
      <img src="/images/logo-animi-red.gif" className="h-24 object-contain absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4" alt="loader" />
    </div>
    ) 
    // get random Product
 
    const randomProducts = products?.results.sort(() => Math.random() - 0.5)
    return (
      <div className="flex flex-col gap-2 sm:gap-4 lg:gap-6 ">
          <SectionHeader conheader="Our Design" red={false}/>
      <MiniCon>
        <div className='w-full flex items-center justify-between max-w-7xl mx-auto mb-2 sm:mb-4'>
        <div className='flex items-center'>
          <h2 className='text-xs md:text-sm text-[#444444] font-medium'>Products</h2>
          <h2 className='text-xs md:text-sm text-[#444444] font-medium'>/{product}</h2>  
        </div>  
        <span className='text-xs md:text-sm text-[#ff0000] font-bold'>{products?.count}</span>
        </div>
        {products?.count != 0 ?(
          <>
          <div className='DesignCon'>
            { randomProducts?.map(({id,name,image,price,old_price,modelimages,slug, measurement})=>(
              <ProductItem key={id} id={id} name={name} image={image} price={price} old_price={old_price} modelimages={modelimages} measurement={measurement} slug={slug} truecon={false}/>
            )) }
          </div>
          <TwoButtons prev={products?.previous} next={products?.next} product={product} loading={setIsLoading} />
          </>     
        ):
        (
          <div className=' grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto my-6 sm:my-24 items-start justify-center gap-12 md:gap-24 mb-6'>
            <img src='/images/no_data@4x.png' width={500} height={500} alt='no product' className='w-full object-contain mb-20 sm:mb-0'/>
            <div className='flex flex-col space-y-4 md:space-y-8 text-left'>
            <h2 className='text-2xl md:text-5xl text-black font-bold'>Product Not Found</h2>
             <div className="text-xs text-white bg-[#9C0F0F] font-bold py-2 px-6 rounded-full text-center shadow-md hover:shadow-none
              transition-all duration-300 ease-in-out cursor-pointer w-64 "onClick={()=>router.push("/fashion/allproducts")}>
              Go Back To All Designs
            </div>
          </div>
          </div>
         )
        } 
        
      </MiniCon>
      </div>
    )
}

export default Products


