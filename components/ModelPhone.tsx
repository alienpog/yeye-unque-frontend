"use client"
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Fragment} from 'react'
import { RootState } from '@/src/redux/store';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { closeprofile } from '@/src/redux/slices/openprofileSlice';
import { useRouter } from 'next/navigation';

function ModelPhone() {
    const product = useAppSelector((state :RootState) => state.profileReducer?.value);
    const open = useAppSelector((state :RootState) => state.pprofileReducer.value);
    const dispatch = useAppDispatch(); 
    const numberWithCommas = (number: number) => {
        return number?.toLocaleString(); }; 
    const router = useRouter();  
  return (
    <>
        <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={()=>{}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-red-500 bg-opacity-80"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
        <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                   >
                    <Dialog.Overlay className="w-full max-w-md h-auto transform overflow-hidden rounded-2xl bg-[#9C0F0F] p-6 text-left align-middle shadow-2xl transition-all mx-12">
                        <div className='w-full flex flex-col space-y-5'>
                        <div className='flex flex-col space-y-2'>
                        <Image width={500} height={500} alt='picture' src={product.image} placeholder='blur' blurDataURL='URL'
                        className='w-full h-[380px] rounded-2xl'/>
                        <p className='phone-text'>Name:<span className='phone-product'>{" "}{product.name}</span></p>
                        <p className='phone-text'>price:<span className='phone-product'>{" "}<span className='line-through'>N</span>{numberWithCommas(product.price)}</span></p>
                        <p className='phone-text'>Quantity:<span className='phone-product'>{" "}X{product.quantity}</span></p>
                        <p className='phone-text'>Total Price:<span className='phone-product'>{" "}<span className='line-through'>N</span>{numberWithCommas(product.totalprice)}</span></p>
                        <p className='phone-text'>Delivery:{"  "}<span className={` py-[2px] px-3 rounded-md text-[12px] text-white ${product.delivery == "pending"? "bg-[#FFCE00] animate-pulse" : product.delivery == "done"? "bg-[#55A366] px-6" :"bg-[#ff0000] px-4"}`}>{product.delivery}{product.delivery == "pending" && "..."}</span></p>  
                        </div>
                        <div className='w-full flex justify-center items-center gap-2 lg:gap-4'>
                        <p onClick= {() => {dispatch(closeprofile())}} className=' flex-1 w-[100px] mx-auto text-center text-xs bg-[#E7D6CE] py-2 rounded-full shadow-md hover:text-white hover:shadow-none transition-all duration-500 ease-in-out cursor-pointer'>Back</p>
                        { product.delivery == "done" && product.id && <p onClick= {() => {dispatch(closeprofile()),router.push(`/productdetails/${product.slug}/?id=${product.id}`)}} className=' flex-1 w-[100px] mx-auto text-center text-xs bg-[#E7D6CE] py-2 rounded-full shadow-md hover:text-white hover:shadow-none transition-all duration-500 ease-in-out cursor-pointer'>Drop a Review </p>}
                        </div>
                        </div>
                    </Dialog.Overlay>
           </Transition.Child>
        </div>
        </Dialog>
      </Transition>
      
    </>
  )
}

export default ModelPhone