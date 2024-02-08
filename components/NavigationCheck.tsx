"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import NavgationTab from './NavgationTab';

function NavigationCheck() {
    const pathname = usePathname();
    const noNav =  ['/only-admin-allowed',
    '/only-admin-allowed/set-product',
    '/only-admin-allowed/see-freegift',
    '/only-admin-allowed/set-freegift',
    '/only-admin-allowed/product-pricing',
    '/only-admin-allowed/closed-clients',
    '/only-admin-allowed/client-details',
    '/only-admin-allowed/contact-clients',
    '/only-admin-allowed/see-testimonials',
    '/only-admin-allowed/set-testimonial',
    '/only-admin-allowed/see-coupons',
    '/only-admin-allowed/set-coupon',];
  return (
    <>
        {/* @ts-ignore */}
        {noNav.includes(pathname) ? null : <NavgationTab/> }
    </>
  )
}

export default NavigationCheck