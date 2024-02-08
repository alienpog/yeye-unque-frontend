"use client"
import AdminLogIn from '@/components/AdminLogIn'
import AdminModelVendor from '@/components/AdminModelVendor'
import AdminNavClock from '@/components/AdminNavClock'
import AdminNumber from '@/components/AdminNumber'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { adminloginremove, adminloginset } from '@/src/redux/slices/AdminLoginSlice'
import { RootState } from '@/src/redux/store'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon, SpeakerWaveIcon, TicketIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathname = usePathname();

    const Products: any[]=[
      '/only-admin-allowed',
      '/only-admin-allowed/set-product',
      '/only-admin-allowed/see-freegift',
      '/only-admin-allowed/set-freegift',
      '/only-admin-allowed/product-pricing',
    ]
    const Customers: any[]=[
      '/only-admin-allowed/closed-clients',
      '/only-admin-allowed/client-details',
      '/only-admin-allowed/contact-clients',
    ]
    const Testimonials: any[]=[
      '/only-admin-allowed/see-testimonials',
      '/only-admin-allowed/set-testimonial',
    ]
    const Coupons: any[]=[
      '/only-admin-allowed/set-coupon',
      '/only-admin-allowed/see-coupons',
    ]

    const status = useAppSelector((state :RootState) => state.adminloginReducer.adminstatus);
    const dispatch = useAppDispatch();

    function deletelogin(){
        localStorage.removeItem('adminstatus');
        dispatch(adminloginremove())

    }
    useEffect(() =>{
      if(localStorage.getItem('adminstatus')){
          // @ts-ignore
          const data = JSON.parse(localStorage.getItem('adminstatus'));
          dispatch(adminloginset(data))
     } 
    },[]);

    return(   
    <> 
     {status ? <><AdminModelVendor/>
        <div className='h-screen flex flex-row'>
            <nav className='fixed w-[260px] h-full bg-[#75192A] flex flex-col items-center space-y-12 pt-10 z-20'>
               <AdminNavClock/>
               <div className='text-xs font-medium text-white space-y-2'>
                    <Link href="/only-admin-allowed" className= {`group flex items-center space-x-2 hover:bg-[#E7D6CE] hover:text-[#605C5A] py-2 px-6 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${Products.includes(pathname) && "bg-[#E7D6CE] text-[#605C5A]"}`}>
                        <ShoppingCartIcon className={`admin-nav-icon ${Products.includes(pathname) && "text-[#ff0000]"} `}/>
                        <p>Products</p>
                    </Link>
                    <Link href="/only-admin-allowed/closed-clients" className={`group flex items-center space-x-2 hover:bg-[#E7D6CE] hover:text-[#605C5A] py-2 px-6 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${Customers.includes(pathname) && "bg-[#E7D6CE] text-[#605C5A]"}`}>
                        <UserCircleIcon className={`admin-nav-icon ${Customers.includes(pathname) && "text-[#ff0000]"} `}/>
                        <p>Customers</p>
                    </Link>
                    <Link href="/only-admin-allowed/see-testimonials" className={`group flex items-center space-x-2 hover:bg-[#E7D6CE] hover:text-[#605C5A] py-2 px-6 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${Testimonials.includes(pathname) && "bg-[#E7D6CE] text-[#605C5A]"}`}>
                       <SpeakerWaveIcon className={`admin-nav-icon ${Testimonials.includes(pathname) && "text-[#ff0000]"}`}/>
                        <p>Testimonials</p>
                    </Link>
                    <Link href="/only-admin-allowed/see-coupons" className={`group flex items-center space-x-2 hover:bg-[#E7D6CE] hover:text-[#605C5A] py-2 px-6 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${Coupons.includes(pathname) && "bg-[#E7D6CE] text-[#605C5A]"}`}>
                        <TicketIcon className={`admin-nav-icon ${Coupons.includes(pathname) && "text-[#ff0000]"}`}/>
                        <p>Coupon</p>
                    </Link>    
               </div>
               <div className=' flex-1 absolute bottom-8'>
                <div className=' w-[40px] h-[40px] flex bg-[#E7D6CE] justify-center items-center rounded-full drop-shadow-md text-[#605C5A] hover:text-white hover:drop-shadow-none transition-all duration-500 ease-in-out cursor-pointer z-50' onClick={deletelogin}>
                  <ArrowRightOnRectangleIcon className='w-6 h-6 rotate-180'/>
                </div>
               </div>
            </nav>
            <main className='flex-1'>
                <AdminNumber/>
                {children}
            </main>
        </div></> : <AdminLogIn/>}
    </>
    )
  }

export default RootLayout