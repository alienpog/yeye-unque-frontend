"use client"
import MiniCon from '@/components/MiniCon'
import BACKEND_URL from '@/src/apiConfig'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { acceptaction } from '@/src/redux/slices/couponSlice'
import { RootState } from '@/src/redux/store'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import { ClassicSpinner } from 'react-spinners-kit'

function Coupon() {
    const [coupon,setCoupon]= useState("")
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState<any>()
    const {data : session}= useSession()
    
    // coupon
    const couponstate = useAppSelector((state :RootState) => state.couponReducer.value);
    const dispatch = useAppDispatch();

    const products = useAppSelector((state: RootState) => state.cartReducer.cart);
    const hasMeasurement = products.items?.some((product) => product.measurement === true);
    const product = products.items
    // posting the coupon state
    useEffect(()=>{
        function couponchange(){
            fetch(`${BACKEND_URL}couponstate/`,{
                method: "POST",
                headers: {
                'content-type': 'application/json',
                },
                body: JSON.stringify({"email": session?.user?.email, "coupon": couponstate})
            })
        }
        couponchange()
    },[couponstate])

    // getting the coupon state
    useEffect(()=>{
        async function couponget(){
           const res = await fetch(`${BACKEND_URL}couponget/`,{
                method: "POST",
                headers: {
                'content-type': 'application/json',
                },
                body: JSON.stringify({"email": session?.user?.email})
            })
            const data = await res.json();

            dispatch(acceptaction(data.state));
        }
        couponget()
    },[session,]
    )
    
    async function submitcoupon(e: FormEvent<HTMLFormElement> ){
        e.preventDefault();
        setLoading(true)
        if(!coupon)return;
        const input = coupon.trim();
        setCoupon("")
        const res= await fetch(`${BACKEND_URL}user-coupon/`,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({"coupon": input, "gmail":session?.user?.email}), 
        })
        const data = await res.json();
        if (res.status === 400){
            setError(data)
        }
        else if(res.status ===200){
            dispatch(acceptaction(data))
        }
        setLoading(false)    
    }

return (
    <MiniCon>
    <div className={`w-full flex flex-col-reverse sm:flex-row items-center ${hasMeasurement ? "sm:justify-around" : "sm:justify-between"} gap-4 max-w-5xl mx-auto py-2 lg:py-3`}>
    <div className='w-full flex flex-col gap-2 lg:gap-4'> 
        {error && <p className="w-full max-w-md text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-1 rounded-md shadow-sm">{error}</p> }
        {couponstate ? <h1 className='text-2xl font-extrabold text-[#ff0000]'>{couponstate}</h1> :
    <form className=" w-full max-w-md shadow-lg rounded-lg flex items-center justify-center space-x-1 h-10" onSubmit={submitcoupon}>
        <div className="py-2 sm:py-3 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-l-lg">
        <input type="text" value={coupon} onChange={(e)=>{setCoupon(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-[#e29898] focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Coupon for 10% 0ff"/>
        </div>
        <button type='submit' disabled={!coupon || product.length == 0} className="flex bg-[#E8D7D0] font-bold text-xs px-4 rounded-r-lg h-full justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed hover:text-white transition-all duration-500 ease-in-out">
        {loading?<ClassicSpinner size={15} color="black"/>:<PaperAirplaneIcon className="w-4 h-4 -rotate-45"/>}</button>
    </form>}
    </div> 
    {hasMeasurement &&  <p className=' w-full sm:text-center text-xs text-[#ff0000] font-medium pl-2'>Our Agent will Contact you for your Measurement</p> }
   
    </div>
    </MiniCon>
)
}

export default Coupon