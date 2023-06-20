"use client"
import React from 'react'
import SectionHeader from '@/components/SectionHeader'
import MiniCon from '@/components/MiniCon'


function ConAboutUs() {
  return (
    <div className='flex flex-col '>
    <div className='md:h-[100svh] pt-6 mb-3 md:mb-12'>
    <MiniCon>
    <SectionHeader conheader="About Us" red={false}/>
      <div className='grid grid-cols-1 mt-2 md:mt-4 md:grid-cols-2 max-w-4xl mx-auto gap-4 md:gap-8'>
       <img src="/images/Rectangle 67.png" loading='lazy' alt='about_us_picture_long' className='w-full max-h-[650px] hidden md:flex'/>
        <p className='text-xs md:text-sm text-[#464646] '>
          Founded in 1989 by the visionary designer Komolafe Mulikat Bolanle, our fashion design company has been at the forefront of the industry for over three decades. With a deep passion for creating exquisite garments, Komolafe Mulikat Bolanle has established herself as a prominent figure in the world of fashion, catering to both big and small events.
          At Yeye Unique Fashion House, our mission is simple: to put our customers first. We believe in truly understanding the needs and desires of our clients and working tirelessly to bring their visions to life. Whether it's a high-profile occasion or an intimate gathering, we are dedicated to making our clients happy by delivering exceptional designs that exceed their expectations.
          One of our core values is punctuality. We understand that time is of the essence, especially in the fast-paced world of fashion. That's why we take great pride in meeting deadlines and ensuring that our clients receive their garments promptly. We value the trust our clients place in us and strive to uphold our reputation for timely and reliable service.
          Yeye Unique Fashion House offers a wide range of products for women, men, and kids. From high fashion clothing to top skirts, trousers, and bags, our collections showcase a harmonious blend of elegance, style, and comfort. We believe that fashion should be accessible to everyone, regardless of age or gender, and we strive to create designs that resonate with a diverse clientele.
          With decades of experience and a deep understanding of the fashion industry, Yeye Unique Fashion House continues to push boundaries and set new trends. We are committed to delivering exceptional craftsmanship, impeccable attention to detail, and a seamless customer experience.
          Thank you for choosing Yeye Unique Fashion. We look forward to creating stunning designs that inspire confidence and celebrate individuality.

        </p>
        <img src="/images/Rectangle 67short.png" loading='lazy' alt='about_us_picture' className='w-full max-h-[300px] md:hidden'/>
      </div>
    </MiniCon>
  </div>

  
   </div>
  )
}

export default ConAboutUs