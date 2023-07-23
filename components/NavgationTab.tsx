'use client'

import {Bars3Icon, AdjustmentsVerticalIcon, PaperAirplaneIcon, } from '@heroicons/react/24/solid'
import Link  from "next/link";
import { useEffect, useState } from "react";
import Offers from "./Offers";
import MenuModel from "./MenuModel";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {  ListBulletIcon, MagnifyingGlassIcon, ShoppingBagIcon} from '@heroicons/react/24/outline';
import AccountMenu from './AccountMenu';

function NavgationTab() {
  const pathname = usePathname()
  const { data : session }= useSession();
  const router = useRouter()

   //fitter for navigation 
   const [Active, SetActive]= useState(false);

   //Search for navigation 
   const [Search, setSearch]= useState(false);
  

  //  menu navigation
   const [MenuActive2, MenuSetActive2]= useState(false);

  //  account navigation
   const [Accountactive, setAccountactive]= useState(false);

  //scrolling for navigation
  const [Show, SetShow] = useState(false)

  // input search navigation
 const [Post, setPost] = useState("")

  useEffect(() => {
   
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      SetShow(scrollY > lastScrollY ? true : false);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };
    const controlNavbar = () => {
      if(window.innerWidth > 768){
        if (window.scrollY > 80 ) {
          SetShow(true)
        }else{
          SetShow(false)
        }
      }
           
      }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };
    
    if (window.innerWidth < 640){
     window.addEventListener("scroll", onScroll)
     return () => {window.removeEventListener('scroll', controlNavbar)}
    };

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener("scroll", onScroll);
  }, [Show]);

   //  close model-menu
   const closemenu = () =>{
    MenuSetActive2(false)
   }
  
  //  close accounts menu
   const closeaccount = () =>{
    setAccountactive(false)
   }
  return (
      <>
      <nav className={` sticky top-0 w-full flex text-[#333333] bg-[#F2F2F2] text-xs font-medium items-center justify-between z-20`}>
        <div className='w-full sm:w-auto flex items-center justify-between sm:justify-center sm:gap-3'>
        <Link href= "/">
           <img className="h-[32px] object-contain shrink-0 pl-2 sm:hidden" src ="/images/yeye-unique-logo-phone.png" alt="yeye-logo-red"/>
           <img className=" h-[50px] object-contain shrink-0 py-2 pl-3 hidden sm:flex" src ="/images/yeye-unique-logo.png" alt="yeye-logo-red"/>
          </Link> 
       <div className=' flex justify-center items-center gap-2'>
          <p className={`flex p-1 ${Search && "bg-[#E7D6CE]"} hover:sm:bg-[#E7D6CE] sm:py-1
            sm:px-4 rounded-full justify-center items-center transition duration-150 ease-out
            hover:ease-in group cursor-pointer`} onClick={()=>{ SetActive(false), setSearch((prev)=>(!prev))}} >
              <MagnifyingGlassIcon className="w-[14px] sm:w:[12px] font-bold object-contain mr-1 text-[#FF0101]"/>
            <span className='hidden sm:inline'>Search</span>   
          </p>
          <p className={`hidden sm:flex ${Active && "bg-[#E7D6CE]"} hover:sm:bg-[#E7D6CE] sm:py-1
            sm:px-4 sm:rounded-full sm:justify-center sm:items-center transition duration-150 ease-out
            hover:ease-in group cursor-pointer`} onClick={()=>{setSearch(false),SetActive((prev)=>(!prev))}} >
            <AdjustmentsVerticalIcon className="w-[12px] object-contain mr-1 text-[#FF0101]"/>
            Filter 
          </p>
       </div>
        </div>

       <div className=' flex items-center justify-center gap-5 mx-3'>
        <div className='relative cursor-pointer'>
           <ShoppingBagIcon className='nav-icon'/>
           <span className=' absolute top-[-2px] right-[-16px] bg-[#FF0101] w-[24px] h-[14px] flex items-center justify-center text-white text-[12px] rounded-full'>900</span>
        </div> 
        <div className='relative cursor-pointer'>
           <ListBulletIcon className='nav-icon'/>
           <span className=' absolute top-[-2px] right-[-16px] bg-[#FF0101] w-[24px] h-[14px] flex items-center justify-center text-white text-[12px] rounded-full'>0</span>
        </div> 
       </div>
       
        <div className=" px-1 sm:px-3 flex items-center justify-center space-x-1">
        <p className={`hidden topnav lg:flex ${pathname =="/" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/')}}>Home</p>
            <p className={`hidden topnav lg:flex ${pathname =="/fashion/allproducts" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/fashion/allproducts')}}>All Design</p>
            <p className={`hidden topnav lg:flex ${pathname =="/about-us" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/about-us')}}>About Us</p>
            <p className={`hidden topnav lg:flex  ${pathname =="/faqs" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/faqs')}}>FAQ’S</p>
            <p className={`hidden topnav lg:flex ${pathname =="/contact-us" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/contact-us')}}>Contact Us</p>
            { session? (
             <div className={`flex items-center justify-center topnav gap-2 ${Accountactive && "bg-[#E7D6CE]"}`} onClick={()=>setAccountactive((prev)=>!prev)}>
              <img className="w-6 h-6 object-contain rounded-full animate-spin" loading="lazy" src={session?.user?.image ||"/images/Avatar-Profile-PNG.png" } alt="avatar" />
              <span className='hidden sm:inline'>Account</span>
             </div>
            ):
              <p className={`topnav ${pathname =="/login" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/login')}}> Login</p>
            }
            <Bars3Icon className="pr-2 h-8 object-contain text-black lg:hidden cursor-pointer" onClick={()=>{MenuSetActive2(true)}}/>
        </div>       
      </nav>
      <div className={`hidden w-full md:flex bg-[#E7D6CE]  text-[#010101] text-xs lg:text-sm shadow-lg ${Active? 'opacity-1 h-[42px] ':'opacity-0 h-0'} transition-all duration-300 ease-in-out `}>
        <div className="flex max-w-6xl w-full mx-auto items-center justify-center space-x-6  lg:space-x-8">
            <p className= {`fitter-action ${pathname =="/fashion/females" && "text-white"}`} onClick={()=>(router.push('/fashion/females'))}>women-design</p>
            <p className= {`fitter-action ${pathname =="/fashion/males" && "text-white"}`} onClick={()=>(router.push('/fashion/males'))}>men-design</p>
            <p className= {`fitter-action ${pathname =="/fashion/kids" && "text-white"}`} onClick={()=>(router.push('/fashion/kids'))}>kids-design</p>
            <p className= {`fitter-action ${pathname =="/fashion/men-shoes" && "text-white"}`} onClick={()=>(router.push('/fashion/men-shoes'))}>men-shoe</p>
            <p className= {`fitter-action ${pathname =="/fashion/men-caps" && "text-white"}`} onClick={()=>(router.push('/fashion/men-caps'))}>men-cap</p>
            <p className= {`fitter-action ${pathname =="/fashion/jewelrys" && "text-white"}`} onClick={()=>(router.push('/fashion/jewelrys'))}>Jewelleries</p>
            <p className= {`fitter-action ${pathname =="/fashion/watches" && "text-white"}`} onClick={()=>(router.push('/fashion/watches'))}>watches</p>
            <p className= {`fitter-action ${pathname =="/fashion/women-bags" && "text-white"}`} onClick={()=>(router.push('/fashion/women-bags'))}>women-bag</p>

        </div>
      </div>
      <form className={`w-full flex " ${Search? ' opacity-1 h-[24px] my-1 sm:my-0 sm:h-[42px] ':'opacity-0 h-0'} transition-all duration-300 ease-in-out `}>
        <div className='w-full h-full max-w-3xl mx-4 md:mx-auto flex items-center justify-center space-x-1 rounded-lg'>
        <div className="py-1 sm:py-2 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-l-lg border-2 border-[#E8D7D0]">
        <MagnifyingGlassIcon className="w-3 object-contain mr-1 text-red-300"/>
        <input type="text" value={Post} onChange={(e)=>{setPost(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Seach Design..." />
        </div>
        <button type='submit' disabled={!Post} className="flex bg-[#E8D7D0] rounded-r-lg h-full w-9 md:w-10 justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed transition-all delay-300 ease-in-out">
        <MagnifyingGlassIcon className="w-4 h-4"/></button>
        </div>
     
      </form>
      <Offers show={Show} active={Active}/>
      <AccountMenu onclick={closeaccount} accountactive={Accountactive}/>
      <MenuModel onclick = {closemenu} menuactive={MenuActive2}/>
      
      </>
      
  )
}

export default NavgationTab