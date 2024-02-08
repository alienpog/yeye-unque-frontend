'use client'

import {Bars3Icon, AdjustmentsVerticalIcon} from '@heroicons/react/24/solid'
import Link  from "next/link";
import {useEffect, useState } from "react";
import Offers from "./Offers";
import MenuModel from "./MenuModel";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {  ListBulletIcon, MagnifyingGlassIcon, ShoppingBagIcon} from '@heroicons/react/24/outline';
import AccountMenu from './AccountMenu';
import { useAppSelector } from "../src/redux/hooks"
import { RootState } from '@/src/redux/store';

function NavgationTab() {
  const pathname = usePathname()
  const { data : session }= useSession();
  const router = useRouter()

   //fitter for navigation 
   const [Active, SetActive]= useState(false);

   //Search for navigation 
   const [search, setSearch]= useState(false);
  

  //  menu navigation
   const [MenuActive2, MenuSetActive2]= useState(false);

  //  account navigation
   const [Accountactive, setAccountactive]= useState(false);

  //scrolling for navigation
  const [Show, SetShow] = useState(false)

 const quantity = useAppSelector((state :RootState) => state.cartReducer.cart.totalquantity);
 const listnumber = useAppSelector((state :RootState) => state.listReducer.list);

 // listnumber

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
        window.addEventListener("scroll", onScroll)
        return () => {window.removeEventListener('scroll', controlNavbar)}
           
      }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
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
          <p className={`flex p-1 ${search && "bg-[#E7D6CE]"} hover:bg-[#E7D6CE] sm:py-1
            sm:px-4 md:px-3 lg:px-2 rounded-full justify-center items-center transition duration-500 ease-in-out
            group cursor-pointer`} onClick={()=>{ SetActive(false), setSearch((prev)=>(!prev))}} >
              <MagnifyingGlassIcon className="w-[14px] sm:w:[12px] font-bold object-contain mr-1 text-[#FF0101]"/>
            <span className='hidden sm:inline'>Search</span>   
          </p>
          <p className={`hidden sm:flex ${Active && "bg-[#E7D6CE]"} hover:sm:bg-[#E7D6CE] sm:py-1
            sm:px-4 sm:rounded-full sm:justify-center sm:items-center transition duration-500 ease-in-out group cursor-pointer`} onClick={()=>{setSearch(false),SetActive((prev)=>(!prev))}} >
            <AdjustmentsVerticalIcon className="w-[12px] object-contain mr-1 text-[#FF0101]"/>
            Filter 
          </p>
       </div>
        </div>

       <div className=' flex flex-row items-end gap-6 mx-3'>
        
        <Link className='flex flex-row items-end cursor-pointer hover:opacity-50 transition-all duration-500 ease-in-out' href= "/add-bag" >
           <p className='hidden sm:inline sm:text-sm  pb-1'>Bag</p>
          <div className='relative'>
           <ShoppingBagIcon className='nav-icon'/>
           <span className=' absolute top-[-2px] right-[-16px] bg-[#FF0101] w-[24px] h-[16px] flex items-center justify-center text-white text-[12px] rounded-full'>{quantity}</span>
          </div>
        </Link> 
        <Link className='flex flex-row items-end cursor-pointer hover:opacity-50 transition-all duration-500 ease-in-out' href= "/dashboard/?#list">
          <p className='hidden sm:inline sm:text-sm pb-1' >List</p>
          <div className='relative'>
           <ListBulletIcon className='nav-icon'/>
           <span className=' absolute top-[-2px] right-[-16px] bg-[#FF0101] w-[24px] h-[16px] flex items-center justify-center text-white text-[12px] rounded-full'>{listnumber.length}</span>
          </div>
          
        </Link> 
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
      <Offers show={Show} active={Active} search ={search}/>
      <AccountMenu onclick={closeaccount} accountactive={Accountactive}/>
      <MenuModel onclick = {closemenu} menuactive={MenuActive2}/>
      
    </>     
  )
}

export default NavgationTab