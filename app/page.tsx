import AllDesign from "@/components/AllDesign"
import HeroSection from "@/components/HeroSection"
import FlexData from "@/components/FlexData"
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
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        <AllDesign/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="womendesign" producturl="/fashion/female" productname="Women Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="mendesign" producturl="/fashion/male" productname="Men Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="kidsdesign" producturl="/fashion/kids" productname="Kids Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="jewelleries" producturl="/fashion/Jewelleries" productname="Jewelleries Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="wristwatches" producturl="/fashion/wristwatches" productname="Wrist Watches Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="mostliked" producturl="/fashion/mostliked" productname="Most Liked Design"/>
      </Suspense>
       <NoProblem/>
       <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
       <Testimonials/>
      </Suspense>
       
      </main>
     
      
    </div>
    
  )
}

export default HomePage