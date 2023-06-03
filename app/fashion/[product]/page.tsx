'use client'

import MiniCon from '@/components/MiniCon';
import ProductItem from '@/components/ProductItem';
import TwoButtons from '@/components/TwoButtons';
import { Item2 } from '@/product';
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeader from '@/components/SectionHeader';

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
      if(page == 'http://127.0.0.1:8000/'+product+'/'){
        return  (page.replace('http://127.0.0.1:8000/'+product+'/',''),
                 router.replace('/fashion/'+product)
        )          
      }
      const url = page?'http://127.0.0.1:8000/'+product+'/?page='+ page : 'http://127.0.0.1:8000/'+product;
      const res = await fetch(url);
      const data  = await res.json();
      Setproduct(data)
      setIsLoading(false)
    }
    queryproducts();
  },[searchParams])

  if (isLoading)
  return( 
    <div className=" w-full h-screen ">
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
        <h2 className='text-xs md:text-sm text-black font-bold'>Products</h2> 
        <span className='text-xs md:text-sm text-black font-bold'>{products?.count}</span>
        </div>
        <div className='DesignCon'>
        {randomProducts?.map(({id,name,image,price,old_price,modelimages})=>(
          <ProductItem key={id} id={id} name={name} image={image} price={price} old_price={old_price} modelimages={modelimages} truecon={false}/>
        ))}
    
       </div>
       <TwoButtons prev={products?.previous} next={products?.next} product={product}/>    
      </MiniCon>
      </div>
    )
}

export default Products
