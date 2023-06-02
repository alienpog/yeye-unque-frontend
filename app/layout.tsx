import NavgationTab from '@/components/NavgationTab'
import '../styles/globals.css'
import Footer from '@/components/Footer'
import ModelImage from '@/components/ModelImage'
import { Providers } from '@/src/redux/provider'
import  {SessionProvider}  from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotLogin from '@/components/NotLogin'

export const metadata = {
  title: 'Yeye Unique',
  description: 'Development Stage',
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
