import NavgationTab from '@/components/NavgationTab'
import '../styles/globals.css'
import Footer from '@/components/Footer'
import ModelImage from '@/components/ModelImage'
import { Providers } from '@/src/redux/provider'
import  {SessionProvider}  from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotLogin from '@/components/NotLogin'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase:new URL("http://localhost:3000"),
  title:{
    default:"Home page",
    template:`%s | yeye unique`
  },
  description: "Unlock your true potential through fashion. Experience the joy of self-discovery and expression. Step into a world of endless possibilities and embrace your authentic self.",
  icons: {
    icon: '/icon.png',
  },
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
        <body className='bg-[#F2F2F2]'> 
          <SessionProvider session={session}>
          <Providers>
          <NotLogin/> 
          <ModelImage/>
          <NavgationTab/>  
          {children} 
           <Footer/> 
           </Providers>
          </SessionProvider>
        </body> 
    </html>
   
  )
}
