
import { Suspense } from 'react'
import CheckOut from '@/components/CheckOut'
import FlexData from './FlexData'
import Coupon from './Coupon'
import CartBox from './CartBox'
import SpecialForYou from "./SpecialForYou"


function AddToCartTwo() {

    return ( 
    <div className='spaceCon mb-2 lg:mb-4'>
    <CartBox/>
    <Coupon/>
    <div className="flex flex-col sm:flex-row-reverse w-full items-start justify-between gap-6" > 
    <CheckOut/>
    <Suspense fallback={<div className="hidden sm:flex items-center justify-center mt-[150px] h-full w-full basis-1/2" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <SpecialForYou/>
      </Suspense>  
    </div>
    <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
    className="w-24 object-contain " /></div>}>
      {/* @ts-ignore */}
      <FlexData mostliked="mostliked" producturl="/fashion/allproducts/" productname="Most Liked Design"/>
    </Suspense>
    <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
    className="w-24 object-contain " /></div>}>
      {/* @ts-ignore */}
      <FlexData mostliked="mostliked" producturl="/fashion/allproducts/" productname="Most Liked Design"/>
    </Suspense>
</div>
    
)
}

export default AddToCartTwo