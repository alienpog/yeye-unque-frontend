'use client'

import {Bars3Icon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid'
import Link  from "next/link";
import { useEffect, useState } from "react";
import Offers from "./Offers";
import MenuModel from "./MenuModel";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function NavgationTab() {
  const pathname = usePathname()
  const { data : session }= useSession();
  const router = useRouter()

   //fitter for navigation 
   const [Active, SetActive]= useState(false);

  //  menu navigation
   const [MenuActive2, MenuSetActive2]= useState(false);

  //scrolling for navigation
  const [Show, SetShow] = useState(false)

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

   const closemenu = () =>{
    MenuSetActive2(false)
   }
  
  return (
      <>
      <nav className={` sticky top-0 w-full flex text-[#333333] bg-[#F2F2F2] text-xs font-medium items-center justify-between z-20`}>

          <Link href= "/">
           <img className="h-[32px] object-contain pl-2 sm:hidden" src ="/images/yeye-unique-logo-phone.png" alt="yeye-logo-red"/>
           <img className=" h-[50px] object-contain py-2 pl-3 hidden sm:flex" src ="/images/yeye-unique-logo.png" alt="yeye-logo-red"/>
          </Link> 
      
        <p className={`hidden sm:flex ${Active && "bg-[#E7D6CE]"} hover:sm:bg-[#E7D6CE] sm:py-1
           sm:px-6 sm:rounded-full sm:justify-center sm:items-center transition duration-150 ease-out
           hover:ease-in group cursor-pointer`} onClick={()=>{SetActive((prev)=>(!prev))}} >
           Filter 
           <AdjustmentsVerticalIcon className={`w-[12px] object-contain ml-1 ${Active && "text-[#FF0101]"} text-[#c9b6ac]
            group-hover:text-[#FF0101] transition duration-200 ease-in-out`}/>
        </p>
       
        <div className=" px-1 sm:px-4 md:px-6 flex items-center justify-center space-x-2">
        <p className={`hidden topnav lg:flex ${pathname =="/" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/')}}>Home</p>
            <p className={`hidden topnav lg:flex ${pathname =="/fashion/allproducts" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/fashion/allproducts')}}>All Design</p>
            <p className={`hidden topnav lg:flex ${pathname =="/about-us" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/about-us')}}>About Us</p>
            <p className={`hidden topnav lg:flex  ${pathname =="/faqs" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/faqs')}}>FAQ’S</p>
            <p className={`hidden topnav lg:flex ${pathname =="/contact-us" && "bg-[#E7D6CE]"}`} onClick={()=>{router.push('/contact-us')}}>Contact Us</p>
            { session? (
             <div className="flex items-center topnav gap-2" onClick={()=>signOut()}>
              <img className="w-6 h-6 object-contain rounded-full animate-spin" loading="lazy" src={session?.user?.image ||"/images/Avatar-Profile-PNG.png" } alt="avatar" />
              <p> LogOut</p>
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
      <Offers show={Show} active={Active}/>
      <MenuModel onclick = {closemenu} menuactive={MenuActive2}/>
      </>
      
  )
}

export default NavgationTab