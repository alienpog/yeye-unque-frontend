import ConAboutUs from '@/components/ConAboutUs'
import { Metadata } from 'next'

export const metadata: Metadata = {
 title:'About-us',
 description: 'this is the about-us page'
}


function AboutUs() {
  
  return (
   <>
   <ConAboutUs/>
   </>
  )
}

export default AboutUs