import AllDesign from "@/components/AllDesign"
import HeroSection from "@/components/HeroSection"
import MostLiked from "@/components/MostLiked"
import NoProblem from "@/components/NoProblem"
import Testimonials from "@/components/Testimonials"
import { Suspense } from 'react';


function HomePage() {
  return (
    <div className="spaceCon">
      <header>
        {/* @ts-ignore */}
        <HeroSection/>
      </header>     
      <main className="spaceCon">
      <Suspense fallback={<div className="flex items-center justify-center my-[100px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-40 object-contain " /></div>}>
        <AllDesign/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[100px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-40 object-contain " /></div>}>
        {/* @ts-ignore */}
        <MostLiked/>
      </Suspense>
       <NoProblem/>
       <Suspense fallback={<div className="flex items-center justify-center my-[100px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-40 object-contain " /></div>}>
        {/* @ts-ignore */}
       <Testimonials/>
      </Suspense>
       
      </main>
     
      
    </div>
    
  )
}

export default HomePage