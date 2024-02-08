"use client"
import BACKEND_URL from '@/src/apiConfig'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


function AdminNumber() {
  const [number, setNumber] = useState<any>({})
  useEffect(()=>{
    async function getnumbers(){
        const res = await fetch(`${BACKEND_URL}admingetnavnumbers/`)
        const data = await res.json()
        setNumber(data)
    }

    const interval = setInterval(() => {
       getnumbers();
      }, 1000);
      return () => clearInterval(interval);
  },[])
  const numberWithCommas = (number: any) => {
    return number?.toLocaleString();};
  return (
    <div className='fixed left-[260px] z-10 w-full flex items-center space-x-[280px] pr-6 pt-2 bg-[#F2F2F2]'>
        <Image src="/images/yeye-unique-logo.png" alt='logo' width={300} height={300} className='h-[60px] object-contain'/>
        <div className='flex items-center justify-end space-x-12 '>
            <p className='admin-nav-number'>Products: <span className='admin-nav-red'>{number.product_count}</span></p>
            <p className='admin-nav-number'>Free Gift: <span className='admin-nav-red'>{number.free_gift_count}</span></p>
            <p className='admin-nav-number'>Revenue: <span className='admin-nav-red'><span className='line-through'>N</span>{numberWithCommas(number.revenue_number)}</span></p>
            <p className='admin-nav-number'>Clients: <span className='admin-nav-red'>{number.user_count - 1}</span></p>
        </div>
    </div>
  )
}

export default AdminNumber