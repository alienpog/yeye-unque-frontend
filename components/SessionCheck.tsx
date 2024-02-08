"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props{
    children:React.ReactNode
}
function SessionCheck({children}:Props) {
  const { data : session }= useSession();
  const router = useRouter()
  if(!session){
    router.replace("/")
  }
  return (
    <div>
       {children}
    </div>
  )
}

export default SessionCheck