import AllDesign from "@/components/AllDesign"
import MostLiked from "@/components/MostLiked"
import NoProblem from "@/components/NoProblem"
import Testimonials from "@/components/Testimonials"
import { Suspense } from "react"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <main className="spaceCon">
            {children}
            <Suspense fallback={<div className="flex items-center justify-center my-[200px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
              className="w-10 object-contain " /></div>}>
                <AllDesign/>
            </Suspense>
            <Suspense fallback={<div className="flex items-center justify-center my-[200px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
            className="w-10 object-contain " /></div>}>
                {/* @ts-ignore */}
                <MostLiked/>
            </Suspense>
            <NoProblem/>
            <Suspense fallback={<div className="flex items-center justify-center my-[200px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
            className="w-10 object-contain " /></div>}>
             {/* @ts-ignore */}
            <Testimonials/>
            </Suspense>
        </main>
    )
  }