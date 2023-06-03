'use client'
import { FormEvent, useEffect, useState } from "react";
import Comment from "./Comment";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { loginopen } from '@/src/redux/slices/loginSlice';
import { useAppDispatch } from '@/src/redux/hooks';


interface Props {
  id: number;
  details: boolean;
}

interface CommentData {
  user: string;
  comment: string;
  image: string;
  checkedlast: string
}

function Comments({ id, details }: Props) {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const {data: session} = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const [post, Setpost] = useState("");
  const dispatch = useAppDispatch()
 
  // converting it from generating many numbers to 10k
  function formatNumber(number:number):string {
    if (number >= 1000) {
      const thousands = Math.floor(number / 1000);
      return `${thousands}k`;
    }
    return number.toString();
  }
  const formattedNumber = formatNumber(commentData.length);

  // geting comments
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`http://127.0.0.1:8000/comments/${id}/`);
      const data = await res.json();
      setCommentData(data);
      setIsLoading(false);
    };
    const interval = setInterval(() => {
    fetchComments();
    }, 500000000);
    return () => clearInterval(interval);
  }, []);
  
  // posting comment
  const postcall = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!session)return dispatch(loginopen());
        if (!post)return;
        const input = post.trim();
        Setpost("")
        const res = await fetch(`http://127.0.0.1:8000/postcomment/${id}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({'email': session?.user?.email,
           'post': input}),
        });
  }


  if (isLoading) 
    return( 
     <div className=" w-full my-4 flex item-center justify-center">
        <img src="/images/logo-animi-red.gif" className="h-6 object-contain" alt="loader" />
      </div>
     ) 
  

  return (
    <>
    <div className={`${!commentData.length && 'h-0 overflow-hidden'} ${details && "mt-4"}`}>
      <div className="flex border-b-2   rounded-sm border-b-[#ECD7CE] pb-[4px] shadow ">
        <h2 className="text-xs text-black font-semibold">comments</h2>
        <span className="ml-auto text-[#747474] text-xs font-semibold">{formattedNumber}</span>
      </div>
      <div className={`${details? "h-[150px]":"h-[60px]"} overflow-y-scroll scrollbar-thumb-rounded-md overflow-x-auto scrollbar-thumb-[#E7D6CE] scrollbar-thin mb-2 px-1 pt-3`}>
        {commentData.map((comment) => (
          <Comment name={comment.user} text={comment.comment} key={comment.comment} image ={comment.image} time={comment.checkedlast} details ={details} />
        ))}
      </div> 
    </div>
    {details && (<form className="shadow-lg flex items-center justify-center space-x-1 h-9 md:h-10 mt-2 rounded-lg mb-4" onSubmit={postcall} >
    <div className="py-2 sm:py-3 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-lg sm:rounded-none sm:rounded-l-lg border-2 border-[#E8D7D0]">
    <input type="text" value={post} onChange={(e)=>{Setpost(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
    border-none  bg-transparent" placeholder="Post a Comment about the Design..." />
    </div>
    <button type='submit' disabled={!post} className="hidden sm:flex bg-[#E8D7D0] rounded-r-lg h-full w-9 md:w-10 justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed transition-all delay-300 ease-in-out">
    <PaperAirplaneIcon className="w-4 h-4 -rotate-45"/></button>
    </form>)}
    
    </> 
  );
}

export default Comments;