import NoProblem from "@/components/NoProblem"
import Testimonials from "@/components/Testimonials"
import { Suspense } from "react"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <main className=" spaceCon my-2 sm:my-4 lg:my-8">
            {children}
            <NoProblem/>
            <Suspense fallback={<div className="flex items-center justify-center my-[200px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
              className="w-10 object-contain " /></div>}>
             {/* @ts-ignore */}
             <Testimonials/>
            </Suspense>
           
        </main>
    )
  }