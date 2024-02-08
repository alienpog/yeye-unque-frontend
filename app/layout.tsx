import '../styles/globals.css'
import Footer from '@/components/Footer'
import ModelImage from '@/components/ModelImage'
import { Providers } from '@/src/redux/provider'
import  {SessionProvider}  from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import NotLogin from '@/components/NotLogin'
import { Metadata } from 'next'
import CookieBanner from '@/components/cookiebanner'
import GoogleAnalytics from "@/components/GoogleAnalytics"
import CartItemsQuery from '@/components/CartItemsQuery'
import ListItems from '@/components/ListItems'
import NavigationCheck from '@/components/NavigationCheck'
import FooterCheck from '@/components/FooterCheck'




export const metadata: Metadata = {
  metadataBase:new URL("https://yeyeunique.com"),
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
        <GoogleAnalytics GA_MEASUREMENT_ID='G-8QH9B4MVXC'/>
        <NotLogin/> 
        <ModelImage/>
        {/* @ts-ignore */}
        <CartItemsQuery/>
        {/* @ts-ignore */}
        <ListItems/>
        <NavigationCheck/>
        {children} 
        <FooterCheck/>
        <CookieBanner/>
        </Providers>
        </SessionProvider>
      </body> 
    </html>   
  )
}
