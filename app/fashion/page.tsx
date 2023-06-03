'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
 
export default function Page(){
  const router= useRouter();
  useEffect(() => {
   router.push('/')
  }, []);
}
 

