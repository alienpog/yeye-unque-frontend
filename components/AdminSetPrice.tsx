"use client"
import BACKEND_URL from "@/src/apiConfig"
import { useAppSelector } from "@/src/redux/hooks"
import { RootState } from "@/src/redux/store"
import { FormEvent, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit"

function AdminSetPrice() {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState("")
    const [error, setError] = useState("")
    const [productsname, setProductsName] = useState("")
    const [addprice, setAddPrice] = useState("")

    // summit prices
   async function submmitform(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    setError("")
    setDone("")
    setLoading(true)
    const res = await fetch(`${BACKEND_URL}adminsummitpricing/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({'productsname': productsname,'addprice': addprice}),
    })
    if(res.status == 200){
        setLoading(false)
        setProductsName("")
        setAddPrice("")
        setDone("Price Added")
    }else{
        setError("Something Went Wrong")
        setLoading(false)
    }
    
    }
  return (
    <div>
        {error && <p className="w-full translate-x-7 text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-2 my-4 rounded-lg z-30">{error}</p> }                    
        { done && <h1 className="w-full translate-x-7 text-center text-sm font-semibold py-2 my-4 text-white bg-[#149512] rounded-lg z-30">{done}</h1>}
        <form className="w-full flex flex-col items-center justify-center gap-8 mt-6 mb-4 " onSubmit={submmitform}>
         <div className="w-full pl-12 mx-auto flex flex-row space-x-6">    
        <div className="Admin-inputfield">
        <input type="text" value={productsname} onChange={(e)=>{setProductsName(e.target.value),setDone(""),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Product Category..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={addprice} onChange={(e)=>{setAddPrice(e.target.value),setDone(""),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Price to Add"/>
        </div>
        </div>
        <div className="flex items-center justify-center w-full mt-2 md:mt-4">
        <button className="text-xs text-white font-bold py-2 px-12 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer"
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Add New Price"}
        </button>   
        </div>
        </form>

    </div>
  )
}

export default AdminSetPrice