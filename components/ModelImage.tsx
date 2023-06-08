'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import SectionHeader from './SectionHeader'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation,Pagination } from "swiper";
import { useAppSelector } from "../src/redux/hooks";
import { RootState } from '@/src/redux/store'
import {closeitem } from "@/src/redux/slices/openSlice";
import { useAppDispatch } from "../src/redux/hooks";
import { useRouter } from 'next/navigation';

function ModelImage() {
  const open = useAppSelector((state :RootState) => state.openReducer.value);
  const products = useAppSelector((state :RootState) => state.productReducer.value);
  const dispatch = useAppDispatch();
  const router= useRouter();
  return (
    <> 
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={()=>{dispatch(closeitem())}}>
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

          <div className="fixed inset-0 overflow-y-auto ">
             <Swiper className="flex w-full h-full item-center justify-center" navigation={true} pagination={true} loop={true} modules={[Navigation,Pagination]} > 
                {products?.images?.map((product :string, index : number)=> (
                  <SwiperSlide key={index} className='flex w-full item-center justify-center'>                  
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      >     
                      <Dialog.Overlay className="w-full h-full flex items-center justify-center">
                      {/* @ts-ignore */}
                      <img src={product} alt={`${index}.${product}`} key={index} width={300} height={400} className='shadow-lg object-contain'/>
                      </Dialog.Overlay>
                      </Transition.Child>
                  </SwiperSlide>
                ))}
                
                <SwiperSlide className='w-full flex items-center justify-center'>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                   >
                    <Dialog.Overlay className="w-full h-full flex items-center justify-center">
                    <Dialog.Overlay className="w-full max-w-md h-auto transform overflow-hidden rounded-2xl bg-[#9C0F0F] p-6 text-left align-middle shadow-2xl transition-all mx-12">
                    <Dialog.Title >
                        <SectionHeader conheader='More Info' red />
                    </Dialog.Title>
                    <Dialog.Overlay className="mt-2 ">
                        <p className="text-xs md:text-sm text-white text-center">
                        Check Design to see more details about the Design
                        </p>
                    </Dialog.Overlay>

                    <Dialog.Overlay className=" flex items-center justify-between mt-4">
                        <div className='modelbtn' onClick= {() => {dispatch(closeitem()),router.push(`/productdetails/${products.slug!}`)}} >Check Design</div>
                        <div className='modelbtn' onClick={()=>{dispatch(closeitem())}}>Close</div>
                    </Dialog.Overlay>
                  </Dialog.Overlay>
                  </Dialog.Overlay>
                </Transition.Child>
                </SwiperSlide>
             </Swiper>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default ModelImage