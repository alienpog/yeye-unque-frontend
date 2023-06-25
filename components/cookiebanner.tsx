'use client';

import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';

export default function CookieBanner(){
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect (() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

    
    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent", cookieConsent)

        //For Testing
        // console.log("Cookie Consent: ", cookieConsent)

    }, [cookieConsent]);
    
    return (
       
        <div className= {`w-full fixed max-w-2xl mx-auto flex flex-col -translate-x-1/2 left-[50%] h-[250px] ${cookieConsent != null ? "bottom-[-100%]" : "bottom-0 sm:bottom-5"}  sm:h-auto transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-[#9C0F0F] p-6 text-left align-middle drop-shadow-2xl transition-all duration-500 ease-out z-10`}>
            <SectionHeader conheader='We use Cookies on our Site' red />
            <div className="mt-2">
            <p className="text-xs md:text-sm text-white text-center">
            cookies help us to understand our clients better and also give our clients a good user experience when using the application
             </p>
            </div>
            <div className=" flex items-center justify-between mt-4">
                <button className='modelbtn' onClick={() => setCookieConsent(false)}>Decline</button>
                <button className='modelbtn' onClick={() => setCookieConsent(true)}>Allow Cookies</button>
            </div>   
        </div>
    
    )}
