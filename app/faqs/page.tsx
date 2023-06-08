import ConFaqs from "@/components/ConFaqs"
import { Metadata } from 'next'


export const metadata: Metadata = {
 title:'Faqs',
 description: 'this is the faqs page'
}

function FaqsPage() {
  return (
    <>
    <ConFaqs/>
    </>
  )
}

export default FaqsPage