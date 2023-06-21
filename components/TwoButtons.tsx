"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

interface props{
  prev?: string,
  next?: string,
  product?:string,
  loading:(isLoading: boolean)=>void,
}

function TwoButtons({prev, next,product,loading}: props) {
  const changeprev = prev?.replace("http://yeye-unique-backend-production.up.railway.app/"+product+"/?page=","")
  const changenext = next?.replace("http://yeye-unique-backend-production.up.railway.app/"+product+"/?page=","")
  const router =useRouter()
  
  return (
    <div>
      <div className='flex items-center justify-center mt-4 sm:mt-8 lg:mt-10 gap-8 max-w-6xl mx-auto'>
    {prev && (
      <div className="twobuttons" onClick={()=>{router.push(`/fashion/${product}?page=${changeprev}`),loading(true)}}>
      Prev
      </div>
    )}
     {next && (
    <div className="twobuttons" onClick={()=>{router.push(`/fashion/${product}?page=${changenext}`),loading(true)}}>
     Next
    </div>
     )}
  </div>
</div>
  )
  
}

export default TwoButtons



