"use client"
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Fragment} from 'react'
import { RootState } from '@/src/redux/store';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { closevendor } from '@/src/redux/slices/AdminopenvendorSlice';

function AdminModelVendor() {
    const product = useAppSelector((state :RootState) => state.vendorReducer?.value);
    const open = useAppSelector((state :RootState) => state.vvendorReducer.value);
    const dispatch = useAppDispatch(); 
    const numberWithCommas = (number: number) => {
        return number?.toLocaleString(); 
    }; 
  return (
    <>
        <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={()=>{}}>
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
                        <div className='flex flex-col space-y-2 relative'>
                        <div className='absolute h-24 w-24 rounded-full overflow-hidden -top-2 -right-3 bg-white drop-shadow-md'>
                            <Image width={500} height={500} alt='picture' src={product.vendorimage || "/images/logoyeye.png" } placeholder='blur' blurDataURL='URL'
                            className='w-full h-full object-contain'/>
                        </div>
                        <Image width={500} height={500} alt='picture' src={product.productimage} placeholder='blur' blurDataURL='URL'
                        className='w-full h-[380px] rounded-2xl'/>
                        <p className='phone-text'>Vendor Name:<span className='phone-product'>{" "}{product.vendorname}</span></p>
                        <p className='phone-text'>Vendor Price:<span className='phone-product'>{" "}<span className='line-through'>{product.vendorprice && "N"}</span>{numberWithCommas(product.vendorprice)}</span></p>
                        <p className='phone-text'>Vendor Number:<span className='phone-product'>{" "}{product.vendorphonenumber}</span></p>
                        <p className='phone-text'>Location:<span className='phone-product'>{" "}{product.vendorloction}</span></p>
                        </div>
                        <p onClick= {() => {dispatch(closevendor())}} className=' flex-1 w-[100px] mx-auto text-center text-xs bg-[#E7D6CE] py-2 rounded-full shadow-md hover:text-white hover:shadow-none transition-all duration-500 ease-in-out cursor-pointer'>Back</p>
                        </div>
                    </Dialog.Overlay>
           </Transition.Child>
        </div>
        </Dialog>
      </Transition>
      
    </>
  )
}

export default AdminModelVendor