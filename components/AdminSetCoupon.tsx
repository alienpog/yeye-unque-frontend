"use client"
import BACKEND_URL from "@/src/apiConfig";
import { useAppSelector } from "@/src/redux/hooks";
import { RootState } from "@/src/redux/store";
import Image from "next/image";
import {FormEvent, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit";


function AdminSetCoupon() {
    // error handling
    const [error, setError]=useState("");

    // done handling
    const [done, setDone]=useState("");

    // loading
    const [loading, setLoading] = useState(false);

    // postin data 
    const [couponname, setCouponName]= useState("");
    const [couponowner, setCouponOwner]= useState("");
    const [ownerphonenumber, setOwnerPhoneNumber]= useState("");
    const [owneremail, setOwnerEmail]= useState("");

    async function submmitform(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("")
        const formData = new FormData();
      
        // Add text data
        formData.append('couponname', couponname); 
        formData.append('couponowner', couponowner); 
        formData.append('ownerphonenumber', ownerphonenumber); 
        formData.append('owneremail', owneremail); 
     
        try {
          setLoading(true);
          const res = await fetch(`${BACKEND_URL}admincouponsubmit/`,{
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            setDone(data);
            setCouponName("") 
            setCouponOwner("") 
            setOwnerPhoneNumber("") 
            setOwnerEmail("")
          } else {
            setError('Failed to submit data to the server.');
          }
        } catch (error) {
          setError('An error occurred while submitting data.');
        } finally {
          setLoading(false);
        }
      }

  return (
    <div>
        {error && <p className="w-full translate-x-7 ml-[200px] text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-2 my-4 rounded-lg z-30">{error}</p> }                    
        { done && <h1 className="w-full translate-x-7 ml-[200px] text-center text-sm font-bold py-2 my-4 text-white bg-[#149512] rounded-lg z-30">{done}</h1>}
        <form className="max-w-[460px] ml-[400px] mx-auto flex flex-col items-center justify-center gap-8 mt-6 mb-4" onSubmit={submmitform}>  
        <div className="Admin-inputfield">
        <input type="text" value={couponname} onChange={(e)=>{setCouponName(e.target.value),setError(""),setDone("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Coupon  Name"/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={couponowner} onChange={(e)=>{setCouponOwner(e.target.value),setError(""),setDone("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Coupon Owner"/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={ownerphonenumber} onChange={(e)=>{setOwnerPhoneNumber(e.target.value),setError(""),setDone("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Owner Phone Number"/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={owneremail} onChange={(e)=>{setOwnerEmail(e.target.value),setError(""),setDone("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Owner Email"/>
        </div>
        <div className="flex items-center justify-center w-full mt-2 md:mt-4">
        <button className="text-xs text-white font-bold py-2 px-12 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer"
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Save Coupon"}
        </button>   
        </div>
        </form>
    </div>
  )
}

export default AdminSetCoupon