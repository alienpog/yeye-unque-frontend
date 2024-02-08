"use client"
import FlexData from "@/components/FlexData";
import MiniCon from "@/components/MiniCon";
import SectionHeader from "@/components/SectionHeader";
import Thankyouvideo from "@/components/Thankyouvideo";
import { useAppSelector } from "@/src/redux/hooks";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function Thankyoupage() {
  const router = useRouter();
  const thankyoustate = useAppSelector((state: RootState) => state.thankyouReducer.value);

  if (!thankyoustate) {
    // Handle the case where thankyoustate is not available (e.g., redirect or display an error message)
    router.replace("/");
    return null; // or return an error message
  }

  return (
    <MiniCon>
      <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-12 lg:space-y-24 my-2 md:my-4 ">
        <div className=" flex flex-col space-y-2 md:space-y-3">
        <SectionHeader conheader="Thank You for Patronizing Us " red={false} />
        <div className="flex flex-col space-y-2 md:space-y-3 lg:space-y-4 max-w-4xl mx-auto ">
          <Thankyouvideo />
          <p className="text-xs text-[#464646] font-medium">
            for more information about the service or customer care call this number:{" "}
            <span className="text-black font-bold">0701 407 4694</span>
          </p>
         </div>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="womendesign" producturl="/fashion/female" productname="Women Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="mendesign" producturl="/fashion/male" productname="Men Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="kidsdesign" producturl="/fashion/kids" productname="Kids Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="jewelleries" producturl="/fashion/Jewelleries" productname="Jewelleries Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="wristwatches" producturl="/fashion/wristwatches" productname="Wrist Watches Design"/>
      </Suspense>
      <Suspense fallback={<div className="flex items-center justify-center my-[150px]" ><img src="/images/logo-animi-red.gif" alt="loading-logo" 
       className="w-24 object-contain " /></div>}>
        {/* @ts-ignore */}
        <FlexData dataquary="mostliked" producturl="/fashion/mostliked" productname="Most Liked Design"/>
      </Suspense>
      </div>
    </MiniCon>
  );
}

export default Thankyoupage;
