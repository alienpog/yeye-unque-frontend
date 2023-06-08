"use client"
import React from 'react'
import SectionHeader from '@/components/SectionHeader'
import MiniCon from '@/components/MiniCon'
import Testimonials from '@/components/Testimonials'
import { useRouter } from 'next/navigation'


function ConAboutUs() {
    const router = useRouter()
  return (
    <div className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
    <div className='md:h-[100svh] pt-6'>
    <MiniCon>
    <SectionHeader conheader="About Us" red={false}/>
      <div className='grid grid-cols-1 mt-2 md:mt-4 md:grid-cols-2 max-w-4xl mx-auto gap-4 md:gap-8'>
       <img src="/images/Rectangle 67.png" loading='lazy' alt='about_us_picture_long' className='w-full max-h-[460px] hidden md:flex'/>
        <div className='flex flex-col md:h-full items-start justify-center gap-4 md:gap-8'>
          <p className='flex-1 text-xs lg:text-sm text-[#464646] '>
          Lorem ipsum dolor sit amet consectetur. Volutpat urna
          senectus augue vitae condimentum ut nec justo. Ultrices 
          viverra non morbi egestas ac mauris ac est sollicitudin.
            Varius faucibus dignissim egestas risus in. Id sit ut
            sollicitudin suscipit feugiat  Lorem ipsum dolor sit amet
            consectetur. Volutpat urna senectus augue vitae condimentum 
            ut nec justo. Ultrices viverra non morbi egestas ac mauris
            ac est sollicitudin. Varius faucibus dignissim egestas
            risus in. Id sit ut sollicitudin suscipit feugiat  Lore
            m ipsum dolor sit amet consectetur. Volutpat urna senectus
            augue vitae condimentum ut nec justo. Ultrices viverra
            non morbi egestas ac mauris ac est sollicitudin. Varius
            faucibus dignissim egestas risus in. Id sit u
            t sollicitudin suscipit feugiat  Lorem ipsum dolor sit amet
            consectetur. Volutpat urna senectus augue vitae condimentum
            ut nec justo. Ultrices viverra non morbi egestas ac mauris
            ac est sollicitudin. Varius faucibus dignissim egestas risus 
            in. Id sit ut sollicitudin suscipit feugiat 
          </p>
          <div className="text-xs text-white font-bold py-2 px-6 bg-[#FF0000] 
          rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer" onClick={()=>{router.push("/contact-us")}} >
          Contact Us
          </div>
        </div>
        <img src="/images/Rectangle 67short.png" loading='lazy' alt='about_us_picture' className='w-full max-h-[300px] md:hidden'/>
      </div>
    </MiniCon>
  </div>
   {/* @ts-ignore */}
   <Testimonials/>
   </div>
  )
}

export default ConAboutUs