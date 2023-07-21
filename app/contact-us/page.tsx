"use client"
import IconBxlFacebookCircle from "@/components/Icons/Facebook";
import IconBxlInstagramAlt from "@/components/Icons/Instagram";
import IconBxlTiktok from "@/components/Icons/TikTok";
import MiniCon from "@/components/MiniCon";
import SectionHeader from "@/components/SectionHeader";
import { EnvelopeIcon,MapPinIcon, PhoneArrowDownLeftIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ClassicSpinner } from "react-spinners-kit";

interface User{
    name: string | null ;
    gmail: string | null;
}


function ContactUs() {
    const [name,Setname] = useState<any>("")
    const [email,Setemail] = useState<any>("")
    const [number,Setnumber] = useState("")
    const [error,Seterror] = useState("")
    const [done,Setdone] = useState("")
    const [loading, Setloading]= useState(false)

    // get data at first load
    const {data: session} = useSession();
    useEffect(()=>{
        async function getUserData(){
            const res =await fetch(`http://127.0.0.1:8000/gettingform/`,
            {
                method: "POST",
                headers: {
                   'content-type': 'application/json' 
                },
                body: JSON.stringify({'email': session?.user?.email})
            })
            const data: User = await res.json()
            Setname(data?.name)
            Setemail(data?.gmail)
        }
        getUserData()  
    },[session])

    // summiting user details
    async function submitform(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        Setloading(true);
        if(!name || !email || !number)return Seterror("All fields required"),Setloading(false);
        const input_name = name.trim()
        const input_email = email.trim()
        const phoneno ='[0-9]{10}'
        const domain = input_email.substring(input_email.lastIndexOf("@"))
        if(domain == "@gmail.com"){
            if(number.match(phoneno)){
                // https://yeye-unique-backend-production.up.railway.app/
                const res= await fetch(`http://127.0.0.1:8000/postingform/`,
                {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({'name':input_name, 'email':input_email,'phone':number})
                })
                const data = await res.json();
                Setdone(data)
                Setname("")
                Setemail("")
                Setnumber("")
                Setloading(false);

            }else{
            Seterror("Please put your Phone Number")
            Setloading(false);
            Setnumber("")
        }
         }else{
            Seterror("username@gmail.com needed")
            Setloading(false);
            Setemail("")
        }
        
        
    }  
  return (
    
    <MiniCon>
    <main className="min-h-[100svh] pt-6 md:pt-12  ">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
     <SectionHeader conheader="Contact Us" red={false}/>
     <div className=" grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6 md:gap-24 mt-2 md:mt-6 lg:mt-12">
        <div>
        {done?(
        <h1 className="text-2xl font-extrabold text-[#9C0F0F]">{done}</h1>
        ):(
            <>
                {error && <p className="w-full text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-1 rounded-md shadow-sm mb-4">{error}</p>}
                <h2 className="text-xs text-[#464646] font-medium mb-4">We Contact You In few Minutes</h2>
                <form className="flex flex-col items-center justify-center gap-2 mt-2 mb-4" onSubmit={submitform}  >
                <div className="inputfield">
                <input type="text" value={name} onChange={(e)=>{Setname(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
                border-none  bg-transparent" placeholder="Your Name...."/>
                </div>
                <div className="inputfield">
                <input type="text" value={email} onChange={(e)=>{Setemail(e.target.value),Seterror("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
                border-none  bg-transparent" placeholder="Your Gmail...."/>
                </div>
                <div className="inputfield">
                <input type="text" value={number} onChange={(e)=>{Setnumber(e.target.value),Seterror("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
                border-none  bg-transparent" placeholder="Your Phone Number...."/>
                </div>
                <div className="flex items-center justify-between w-full mt-2 md:mt-4">
                <button className="text-xs text-white font-bold py-2 px-6 bg-[#9C0F0F] 
                rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer "
                type="submit">
                    {loading?<ClassicSpinner size={15} color="white"/>:"Send"}
              </button>
              <Link href="https://wa.me/+2347014074694"className="text-xs text-white font-bold py-2 px-6 bg-green-900 
                rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer ">
                <span className="mr-2 font-bold animate-pulse"> OR </span>Chat Us On Whatsapp
                </Link>   
               </div>
                
              </form>
            </>
         )}
        
        </div>
        <div className="flex flex-col items-start space-y-4 md:space-y-7 mb-4">
            <div className="flex space-x-2 items-end">
                <MapPinIcon className="w-5 h-5 text-[#9C0F0F]"/>
                <p className="info">Suite A1 Sikombs Plaza, 113, idi iroko Expressway Baby 'o' Bus-Stop, Oju-Ore Ota, Ogun State. </p>
            </div>
            <div className="flex space-x-2 items-center">
                <EnvelopeIcon className="w-4 h-4 text-[#9C0F0F]"/>
                <p className="info">info@yeyeunique.com</p>
            </div>
            <div className="flex space-x-2 items-center">
                <PhoneArrowDownLeftIcon className="w-4 h-4 text-[#9C0F0F]"/>
                <p className="info">0701 4074 694</p>
            </div>
            <div className="w-full flex items-center justify-start space-x-6 mt-3 mb-4">
                <Link href='https://www.instagram.com/yeye_unique_fashion/'><IconBxlInstagramAlt className="socialicon2"/></Link>
                <Link href='https://www.tiktok.com/@yeye_unique?lang=en'><IconBxlTiktok className="socialicon2"/></Link>
                {/* <Link href=''><IconBxlFacebookCircle className="socialicon2"/></Link> */}
            </div>
        </div>
     </div>
    </main>
  </MiniCon>
   
  )
}

export default ContactUs