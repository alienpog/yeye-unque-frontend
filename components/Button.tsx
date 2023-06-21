"use client"
import { ClassicSpinner } from "react-spinners-kit";
import { useState } from 'react';
import { useRouter } from "next/navigation"

function Button() {
  const router = useRouter()
  const [loading, Setloading]= useState(false)
  return (
    <div className="flex justify-end mt-4  max-w-6xl mx-auto">
        <div className="text-xs text-[#FF0000] font-bold py-2 px-6 border-2 border-[#E7D6CE] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer " onClick={()=>{router.push('/fashion/allproducts'),Setloading(true)}}>
        {loading?<ClassicSpinner size={15} color="#ff0000"/>:" More Design"}
        </div>
    </div>
    
  )
}

export default Button