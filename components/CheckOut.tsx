"use client"
import { ClassicSpinner } from "react-spinners-kit"
import SectionHeader from "./SectionHeader"
import { useEffect, useState } from "react"
import { useAppSelector } from "../src/redux/hooks"
import { RootState } from "@/src/redux/store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { loginopen } from '@/src/redux/slices/loginSlice';
import { useAppDispatch } from "../src/redux/hooks";
import BACKEND_URL from "@/src/apiConfig"

interface User{
  name: string | null ;
  gmail: string | null;
  phone: string | null;
  address: string | null
}

function CheckOut() {
  const [loading,setLoading] = useState(false)
  const dispatch = useAppDispatch();
  
  // coupon
  const couponstate = useAppSelector((state :RootState) => state.couponReducer.value);

  // submitting inputs
  const [name,setName] = useState<any>("")
  const [number,setNumber] = useState<any>("")
  const [address,setAddress] = useState<string | null>("")
  const [shipping,setShipping] = useState<string>("")
  const [price,setPrice] = useState<number | null>()
  const [discount,setDiscount] = useState<number | null>()

  const {data : session} = useSession()

  const router = useRouter()

  // subtotal number
  let subtotal = 0

  const products = useAppSelector((state :RootState) => state.cartReducer.cart);
  products.items?.forEach((product) =>{
   subtotal += product.subprice;
  })
  const product = products.items
  useEffect(()=>{
    // .toFixed(2)
    if(couponstate){
      setDiscount(subtotal - (subtotal * 0.1))
    }else{return}
    
  },
  [couponstate,products])
   
  let total = (discount? discount : subtotal) + (price ? price : 0)

// getting user form data
  useEffect(()=>{
    async function getUserData(){
        const res =await fetch(`${BACKEND_URL}gettingform/`,
        {
            method: "POST",
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({'email': session?.user?.email})
        })
        const data: User = await res.json()
        setName(data?.name)
        setAddress(data?.address)
        setNumber(data?.phone)
    }
    getUserData()  
},[session])


  // Check each sentence for the presence of keywords
  useEffect(()=>{
    if (address) {
      const closebylist = ["ogun","lagos"];
      const notclosebylist = ["oyo", "osun", "ekiti", "ondo"];
      const lowerValue = address.toLowerCase();
      const sentences = lowerValue.split(/[.!?]/);
    
      let foundCloseBy = false; // To keep track if a closeby keyword is found
      let foundNotCloseBy = false; // To keep track if a not closeby keyword is found
      for (const sentence of sentences) {
        for (const closeKeyword of closebylist) {
          if (sentence.includes(closeKeyword)) {
            foundCloseBy = true;
            break; // Exit the loop if a close keyword is found
          }
        }
    
        if (foundCloseBy) {
          setShipping("Free");
          break; // No need to check further, we found a close keyword
        }
    
        for (const notCloseKeyword of notclosebylist) {
          if (sentence.includes(notCloseKeyword)) {
            foundNotCloseBy = true;
            break; // Exit the loop if a not close keyword is found
          }
        }
        if (foundNotCloseBy) {
          setShipping("4,000");
          setPrice(4000);
        } else {
          setShipping("Our agents will contact you for the Shipping Fee");
        }
      
      }
    
      
    }
  },[address])

  // posting the price state
useEffect(() => {
  // Calculate the total based on discount, subtotal, and price
  const calculatedTotal = (discount ? discount : subtotal) + (price ? price : 0);

  // Only make the API call when the total is calculated and products are present
  if (products.items.length > 0 && calculatedTotal !== null) {
    // Make the API call to save the total
    // @ts-ignore
    function pricechange() {
      fetch(`${BACKEND_URL}pricestate/`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({"email": session?.user?.email, "price": calculatedTotal, "shipping": shipping})
      });
    }
    pricechange();
  }
}, [discount, subtotal, price, products.items.length, session?.user?.email, shipping])
 
const numberWithCommas = (number : any) => {
  return number?.toLocaleString(); // Automatically adds commas as per user's locale
};

  return (  
      <div className="flex w-full flex-col items-start justify-center sm:gap-4 lg:gap-8 px-3 sm:px-6 basis-1/2 ">
      <SectionHeader conheader="Bag Total" red={false}/>
      <div className="flex flex-col justify-center items-start gap-4 lg:gap-8" id="setting">
        <div className="flex items-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000]"/>
            <p className="text-xs font-medium text-[#5D5D5D] ">
             Sub Totals :
            {products.items.length > 0 && <span className="text-black font-bold">
              {" "}<span className='line-through'>N</span>{numberWithCommas(subtotal)}{couponstate && <> -10% = <span className='line-through'>N</span>{numberWithCommas(discount)} </> }
             </span>}
            </p>
        </div>
        <div className="flex justify-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-1"/>
            <div className="flex flex-row justify-center gap-2">
            <p className="text-xs font-medium text-[#5D5D5D] ">
             Shipping Fee :
            </p>
            <p className={`text-xs flex-1 ${shipping == "Free" ?"text-[#009A19] font-bold": price ?"text-black font-bold": "text-black font-medium"}`}>
            {" "}{price && <span className='line-through'>N</span>}{shipping}
            </p>
            </div>
        </div>
      {name && address && number ? (
        <>
        <div className="flex items-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000]"/>
            <div className="text-xs font-medium text-[#5D5D5D] flex flex-row justify-center gap-2 ">
            <p>Your Name :</p> 
             <span className="text-black text-xs font-medium flex-1">
              {" "}{name}
             </span>
             <p className="text-black text-[8px] px-2 bg-[#E7D6CE] rounded-full cursor-pointer  shadow-md hover:shadow-none hover:text-white transition-all duration-300 ease-in-out" onClick={()=>{router.push("/user-setting/?query=setting")}}>
             change
             </p>
            </div>
        </div>
        <div className="flex items-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000]"/>
            <div className="text-xs font-medium text-[#5D5D5D] flex flex-row justify-center gap-2 ">
             <p>Your Phone Number :</p> 
             <span className="text-black text-xs font-medium flex-1">
              {" "}{number}
             </span>
             <p className="text-black text-[8px] px-2 bg-[#E7D6CE] rounded-full cursor-pointer  shadow-md hover:shadow-none hover:text-white transition-all duration-300 ease-in-out" onClick={()=>{router.push("/user-setting/?query=setting")}}>
             change
             </p>
            </div>
        </div>
        <div className="flex items-start space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-1"/>
            <div className=" flex flex-row justify-center gap-2">
                <p className="text-xs font-medium text-[#5D5D5D] ">
                  Shipping Address :
               </p> 
               <div className="flex flex-col items-start justify-center flex-wrap gap-1 ">
               <p className="text-black text-xs font-medium flex-1 w-full">
                 {" "}{address}
               </p>
               <p className="text-black text-[8px] px-2 py-[2.5px] bg-[#E7D6CE] rounded-full cursor-pointer max-w-[50px] shadow-md hover:shadow-none hover:text-white transition-all duration-300 ease-in-out" onClick={()=>{router.push("/user-setting/?query=setting")}}>
                 change
               </p>
               </div>
             </div>
            
        </div>
        </>
      ):(
        <div className="flex items-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2 rounded-full bg-[#ff0000] mt-1"/>
            <div className=" flex flex-row items-center justify-center gap-2">
                <p className="text-xs font-medium text-[#5D5D5D] ">
                  Fill in your information for Delivery
               </p>
               <p className="text-black font-semibold text-[10px] py-1 shadow-md bg-[#E7D6CE] rounded-full cursor-pointer px-4 hover:shadow-none hover:text-white transition-all duration-300 ease-in-out"
               onClick={()=>{session? router.push("/user-setting/?query=setting"): dispatch(loginopen()) }}>
               Settings  
               </p>
             </div>
            
        </div>
      )

      }
      <div className="flex items-center space-x-1 lg:space-x-2">
            <div className=" w-2 h-2  rounded-full bg-[#ff0000]"/>
            <p className="text-xs font-medium text-[#5D5D5D] ">
              Total Price :
             <span className="text-black font-bold">
             {subtotal > 0 && <>{" "}<span className='line-through'>N</span>{numberWithCommas(total)}</>}
             </span>
             </p>
        </div> 
        <button onClick={()=> {router.push("/check-out"),setLoading(true)}} disabled={!name || !number || !address || product.length == 0 } className="text-xs text-white sm:text-[#ff0000] bg-[#9C0F0F] sm:bg-transparent font-bold py-2 px-6 sm:border-[#E7D6CE] sm:border-2 
          rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer md:mt-4  disabled:bg-gray-400/50 disabled:text-white/50 disabled:border-0 disabled:shadow-none disabled:cursor-not-allowed hidden sm:inline-block"
          >
              {loading?<ClassicSpinner size={15} color="red"/>:"Check out"}
        </button> 
        <button onClick={()=> {router.push("/check-out"),setLoading(true)}} disabled={!name || !number || !address || product.length == 0 } className="text-xs text-white sm:text-[#ff0000] bg-[#9C0F0F] sm:bg-transparent font-bold py-2 px-6 sm:border-[#E7D6CE] sm:border-2 
          rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer md:mt-4  disabled:bg-gray-400/50 disabled:text-white/50 disabled:border-0 disabled:shadow-none disabled:cursor-not-allowed sm:hidden"
          >
              {loading?<ClassicSpinner size={15} color="white"/>:"Check out"}
        </button> 
      </div>
      </div>

  )
}

export default CheckOut