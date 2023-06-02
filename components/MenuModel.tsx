import { XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import MiniCon from './MiniCon'
import { usePathname } from 'next/navigation'

interface props{
    onclick: () => void,
    menuactive: boolean,
   
}
function MenuModel({onclick,menuactive}: props) {
  const pathname = usePathname()
  return (
    <div className={`bg-[#FF0000] w-full min-h-screen text-white text-xs sm:text-sm font-bold pr-6 z-40 fixed top-0 ${menuactive ? "right-0" : "right-[-100%]"} transition-all duration-500 ease-in-out`}>
        <div className='w-full flex justify-end mt-4 mb-8'>
        <XMarkIcon className='w-6 h-6 cursor-pointer' onClick={onclick}/>
        </div>
        <MiniCon>
            <div className='flex flex-col space-y-6 text-end'>
                <Link className={`menunav ${pathname == "/" && "-translate-x-2 opacity-50"}`} href='/'onClick={onclick}>Home</Link>
                <Link className={`menunav ${pathname == "/fashion/allproducts" && "-translate-x-2 opacity-50"}`} href='/fashion/allproducts'onClick={onclick}>All Design</Link>
                <Link className={`menunav ${pathname == "/about-us" && "-translate-x-2 opacity-50"}`} href='/about-us'onClick={onclick}>About Us</Link>
                <Link className={`menunav ${pathname == "/faqs" && "-translate-x-2 opacity-50"}`} href='/faqs'onClick={onclick}>FAQ’s</Link>
                <Link className={`menunav ${pathname == "/contact-us" && "-translate-x-2 opacity-50"}`} href='/contact-us'onClick={onclick}>Contact Us</Link>
                <Link className={`menunav phonemenu ${pathname == "/fashion/females" && "-translate-x-2 opacity-50"}`} href='/fashion/females'onClick={onclick}>Women</Link>
                <Link className={`menunav phonemenu ${pathname == "/fashion/males" && "-translate-x-2 opacity-50"}`} href='/fashion/males'onClick={onclick}>Men</Link>
                <Link className={`menunav phonemenu ${pathname == "/fashion/kids" && "-translate-x-2 opacity-50"}`} href='/fashion/kids'onClick={onclick}>Kids</Link>
            </div>
        </MiniCon>
    </div>
  )
}

export default MenuModel