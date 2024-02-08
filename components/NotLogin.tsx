"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import SectionHeader from './SectionHeader'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { RootState } from '@/src/redux/store'
import {loginclose } from "@/src/redux/slices/loginSlice";
import { useRouter } from 'next/navigation'

function NotLogin() {
  const router = useRouter()
  const open = useAppSelector((state :RootState) => state.loginReducer.value);
  const dispatch = useAppDispatch();
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

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center ">
        <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                   >
                    <Dialog.Overlay className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#9C0F0F] p-6 text-left align-middle shadow-2xl transition-all mx-12">
                    <Dialog.Title >
                        <SectionHeader conheader='Login Required' red />
                    </Dialog.Title>
                    <div className='space-y-6'>
                    <div className="mt-2">
                        <p className="text-xs md:text-sm text-white text-center">
                        you need to login with your Email so you can keep items, add to bag, like design, drop reviews on each design, winning Gifts and we also be sending you the Latest Design to your Email with tips and tricks so you look unique anywhere you go! </p>
                    </div>
                    <div className=" flex items-center justify-between mx-auto space-x-6">
                        <div className='modelbtn' onClick={()=>{router.push('/login'),dispatch(loginclose())}} >Log In</div>
                        <div className='modelbtn' onClick={()=>{dispatch(loginclose())}}>Cancel</div>
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

export default NotLogin