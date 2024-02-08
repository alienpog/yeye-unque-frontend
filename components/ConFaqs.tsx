"use client"
import MiniCon from "@/components/MiniCon"
import SectionHeader from "@/components/SectionHeader"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const query =[
    {
        "question":"What types of clothing do you design?",
        "answer":"We specialize in designing unique and custom-made women, men and kid's clothing, including dresses, skirts, tops, and accessories."
    },
    {
        "question":"Can I request a custom design?",
        "answer":"Yes, we offer custom design services to create a one-of-a-kind piece that is tailored to your preferences and style."
    },
    {
        "question":"How long does it take to receive my order?",
        "answer":"The turnaround time for an order varies based on the complexity of the design and materials needed. We typically provide an estimated timeline during the consultation process."
    },
    {
        "question":"Do you offer alterations?",
        "answer":"Yes, we offer alteration services to ensure the perfect fit for your clothing."
    },
    {
        "question":"Are the women's bags made from quality materials?",
        "answer":"Absolutely. We prioritize the use of high-quality materials to ensure that our women's bags are not only stylish but also durable and reliable for everyday use."
    },
    {
        "question":"Can I find men's shoes suitable for formal occasions and casual outings?",
        "answer":"Certainly. Our collection includes men's shoes suitable for various occasions, from formal business meetings to casual outings. We have options that blend style and versatility."
    },
    {
        "question":"Are your watches made with high-quality materials?",
        "answer":"Yes, our watches are crafted from high-quality materials to ensure precision, durability, and a stylish appearance. We prioritize quality and attention to detail in every timepiece."
    },
    {
        "question":"What types of jewelry do offer?",
        "answer":"We offers a diverse range of jewelry, including necklaces, bracelets, earrings, rings, and more. Our collection encompasses both classic and contemporary designs to suit various tastes and occasions."
    },
    {
        "question":"How can I schedule a consultation?",
        "answer":"You can schedule a consultation by contacting us via email or phone, or by filling out the contact form on our website."
    },
    {
        "question":"What is your return policy?",
        "answer":"We do not accept returns on custom-made or altered items. However, we will work with you to ensure your satisfaction with the final product."
    },
    {
        "question":"Do you have physical store or showroom where I can visit?",
        "answer":"Currently, our primary presence is online, allowing us to reach a global audience. You can explore our collections and make purchases through our website, ensuring a convenient and accessible shopping experience."
    },
    {
        "question":"What materials do you use in your designs?",
        "answer":"We use a variety of high-quality materials, including silk, lace, cotton, and other fabrics, depending on the design and client's preference."
    },
    {
        "question":"What payment methods do you accept?",
        "answer":"We accept payment via cash, check, or credit/debit card."
    },
    {
        "question":"Do you offer international shipping?",
        "answer":"Yes, we offer international shipping, but additional fees may apply depending on the destination. Please contact us for more information."
    },

]
function ConFaqs() {
    const[show,Setshow] = useState<number>(0)
  return (
    <div className="my-4 md:my-6 lg:my-8 ">
    <MiniCon>
    <SectionHeader conheader="Faq's" red={false}/>
   <div className="max-w-2xl mx-auto mt-2 md:mt-6 lg:mt-8">
       {
        query.map(({question, answer}, index)=>(
         <div className="mb-2 md:mb-4" key={index}>
         <div className="flex items-center justify-between py-2 px-3 bg-[#E7D6CE] rounded-lg cursor-pointer group" onClick={()=>{Setshow(index)}}>
         <h1 className="text-[#464646] text-xs font-medium group-hover:text-white transition-all duration-300 ease-in-out ">{question}</h1>
         <ChevronDoubleDownIcon className={`w-4 h-4 lg:w-6 lg:h-6 text-[#9C0F0F] ${show == index? '':'-rotate-180'} transition-all duration-300 ease-in-out`} />
         </div>
          <p className={`text-xs md:text-sm text-[#747474] px-4 ${show ==index?'h-auto py-2':'h-0 overflow-hidden'} transition-all duration-300 ease-in-out `}>
         {answer}
         </p>
         </div>
        ))
       } 
    
    </div>
    </MiniCon>
    </div>
  )
}

export default ConFaqs