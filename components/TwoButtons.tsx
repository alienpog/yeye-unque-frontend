"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

interface props{
  prev?: string,
  next?: string,
  product?:string,
}

function TwoButtons({prev, next,product}: props) {
  const changeprev = prev?.replace("http://127.0.0.1:8000/"+product+"/?page=","")
  const changenext = next?.replace("http://127.0.0.1:8000/"+product+"/?page=","")
  const router =useRouter()
  
  return (
    <div>
      <div className='flex items-center justify-center mt-4 sm:mt-8 lg:mt-10 gap-8 max-w-6xl mx-auto'>
    {prev && (
      <div className="twobuttons" onClick={()=>{router.push(`/fashion/${product}?page=${changeprev}`)}}>
      Prev
      </div>
    )}
     {next && (
    <div className="twobuttons" onClick={()=>{router.push(`/fashion/${product}?page=${changenext}`)}}>
    Next
    </div>
     )}
  </div>
</div>
  )
  
}

export default TwoButtons



