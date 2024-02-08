
import { Metadata } from 'next'
import Thankyoupage from "@/components/Thankyoupage";

export const metadata: Metadata = {
 title:'Thank-you',
 description: 'this is the thank-you page'
}


function page() {


  return (
    <div>
    <Thankyoupage/>
    </div>
   
  )
}

export default page