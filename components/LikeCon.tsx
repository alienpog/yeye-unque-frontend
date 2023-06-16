'use client'
import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as RedHeartIcon} from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react';
import { loginopen } from '@/src/redux/slices/loginSlice';
import { useAppDispatch } from '@/src/redux/hooks';

interface props{
    id:number;
    details:boolean;
}

function LikeCon({id, details}: props) {
  const dispatch = useAppDispatch()
  const{data: session}= useSession()

  const [like,Setlike] = useState<boolean>(false)
 
   // posting the user email to check if he/she liked  the product
    useEffect(()=>{
      const fecthlikes = async()=>{
        const res= await fetch(`${process.env.BACKEND_URL}/productlikes/${id}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({'email': session?.user?.email}),
        }
        )
          const data = await res.json()
          Setlike(data)   
        }
        fecthlikes()
      },[id,session])

      //auto count product  
      const [count, Setcount] = useState<number>(0)
      // converting it from generating many numbers to 10k
      function formatNumber(number:number):string {
      if (number >= 1000) {
        const thousands = Math.floor(number / 1000);
        return `${thousands}k`;
      }
      return number.toString();
    }
    const formattedNumber = formatNumber(count);


    // product likes count
      useEffect(()=>{
        async function countlikes(){
          const res= await fetch(`${process.env.BACKEND_URL}/likescount/${id}`)
          const data = await res.json()
          Setcount(data)
        }
        const interval = setInterval(() => {
         countlikes()
        },500000000);
        return () => clearInterval(interval);
      },[])
      

     // posting the user email to like the product
        const postlike = async(action: string)=>{
          if(!session)return dispatch(loginopen());
          const res= await fetch(`${process.env.BACKEND_URL}/postlike/${id}/`,
          {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
          
           body: JSON.stringify({'email': session?.user?.email, 'action': action}),
         }
          )
           const data = await res.json()
           Setlike(data)

         }
     

  return (
    <div className='flex space-x-1 text-white items-center'>
        {like?
        <RedHeartIcon className={`w-5 h-5 hover:scale-150 transition ease-in-out duration-300 cursor-pointer text-[#ff0000] ${details && "w-6 h-6 sm:w-7 sm:h-7"}`} onClick={() =>{postlike('unlike')}}/>
        :
        <HeartIcon className={`w-5 h-5 hover:scale-150 transition ease-in-out duration-300 cursor-pointer ${details && "w-6 h-6 sm:w-7 sm:h-7 text-black"}`} onClick={() => {postlike('like')}}/>
        }
        
        <p className={`text-xs font-medium ${details && "sm:text-sm text-black"}`}>{formattedNumber}</p>
    </div>
  )
}

export default LikeCon