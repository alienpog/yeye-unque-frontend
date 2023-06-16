'use client'

import Link from "next/link"
import MiniCon from "./MiniCon"
import { PaperAirplaneIcon, PhoneArrowDownLeftIcon } from "@heroicons/react/24/solid"
import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import WhiteLogo from "@/public/images/yeye-unique-logo-white.png"
import IconBxlInstagramAlt from "./Icons/Instagram"
import IconBxlTiktok from "./Icons/TikTok"
import IconBxlFacebookCircle from "./Icons/Facebook"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { ClassicSpinner } from "react-spinners-kit"
import { InboxArrowDownIcon } from "@heroicons/react/24/solid"


function Footer() {
    const {data: session}= useSession()
    const pathname = usePathname()
   
// summitting email
    const [error, Seterror]=useState("")
    const [email, Setemail]=useState("")
    const [ done, Setdone]=useState("")
    const [loading, Setloading]=useState(false)

    async function emailsubmit (e: FormEvent<HTMLFormElement> ){
        e.preventDefault()
        Setloading(true)
        if(!email)return;
        const input = email.trim()
        const domain = input.substring(input.lastIndexOf("@"))
        if(domain == "@gmail.com"){
            Setemail("")
            const res= await fetch(`${process.env.BACKEND_URL}/newsletter/`,{

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({'email': input}), 
            })
           
            if(res.status == 403){
                const data: any = res.json();
                Seterror(data);
                Setloading(false)
            }else if(res.status == 200){
                 const data: any = res.json();
                 Setdone(data);
                 Seterror("")
                 Setloading(false)
            }
            
        }else{
            Seterror("only username@gmail.com needed")
            Setemail("")
            Setloading(false)
        }
        
        
    }
  return (
    <div className="bg-[#FF0000] ">
        <MiniCon>
            <div className=" py-6 flex flex-col h-[100svh] sm:h-[500px] ">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:px-3 sm:items-center 
            sm:justify-center sm:space-x-4">
           {pathname !== "/about-us" &&  <Link href='/about-us'className="FooterBtn">
                About Us
            </Link>}
            {pathname !=="/faqs" && <Link href='/faqs' className="FooterBtn">
                FAQ’s
            </Link>}
            {pathname !=="/contact-us" && <Link href='/contact-us' className="FooterBtn">
                Contact US
            </Link>}
            
            </div>
            <div className={`flex-1  my-12 flex flex-col sm:flex-row items-center ${!session?"justify-between space-y-6" :"justify-center"}`}>
                
                   
                    {!session &&
                    (
                        < div className="flex flex-col space-y-2">
                            {error && <p className="w-full text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-1 rounded-md shadow-sm">{error}</p> }
                            
                           { done?(<h1 className="text-2xl font-extrabold text-white">{done}</h1>):(
                            <>
                            <h1 className="text-2xl font-extrabold text-white">Special Gift!</h1>
                            <p className="text-xs sm:text-sm font-bold text-white/80">Subcribe To Our Newsletter To Have The Latest 
                                Design Update </p>
                            <form className="shadow-lg flex items-center justify-center space-x-1 h-10 max-w-sm " onSubmit= {emailsubmit}>
                                <div className="py-2 sm:py-3 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-lg sm:rounded-none sm:rounded-l-lg">
                                <input type="text" value={email} onChange={(e)=>{Setemail(e.target.value),Seterror("")}} className=" flex-1 text-black text-xs placeholder-black/50 focus:ring-0 outline-none
                                border-none  bg-transparent" placeholder="Put your Gmail..." />
                                </div>
                                <button type='submit' disabled={!email} className="hidden sm:flex bg-[#E8D7D0] rounded-r-lg h-full w-10 justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed transition-all delay-300 ease-in-out">
                                {loading?<ClassicSpinner size={15} color="black"/>:<PaperAirplaneIcon className="w-4 h-4 -rotate-45"/>}</button>
                            </form></>
                           )

                           } 
                       </div>
                      )  
                    }
                    
              
                <div className="flex flex-col justify-center items-center text-center space-y-6">
                        <Image src={WhiteLogo} className=" h-[65px] w-[60px] object-contain" alt="blacklogo"/>
                    <p className="text-xs font-bold text-white/80 text-center">We make our client Unique</p>
                    <div className="flex items-center justify-center space-x-4 ">
                        {/* <Link href=''><IconBxlInstagramAlt className="socialicon"/></Link> */}
                        <Link href='https://www.tiktok.com/@yeye_unique?lang=en'><IconBxlTiktok className="socialicon"/></Link>
                        {/* <Link href=''><IconBxlFacebookCircle className="socialicon"/></Link> */}
                    </div>
                    <p className="flex items-center justify-center gap-2 text-xs font-bold text-white text-center tracking-widest"><InboxArrowDownIcon className="w-4 h-4 text-white"/>abbey@yeyeunique.com</p>
                </div>
            </div>
            <Link href="" className="flex justify-center text-[#febfbf] text-xs font-bold pt-24 animate-pulse">Design&Build By Alienartech</Link>
            </div>
        </MiniCon>
    </div>
  )
}

export default Footer