"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminCouponsButtons() {
    const pathname = usePathname();

    const SeeCoupons =['/only-admin-allowed/see-coupons']
    const SetCoupons =['/only-admin-allowed/set-coupon']
    return (
      <div className="w-full fixed left-[260px] top-[65px] z-40 bg-[#75192A] px-6 py-2">
          <div className="max-w-[900px] mx-[56px] flex items-center space-x-4">
          {/* @ts-ignore */}
          <Link href= "/only-admin-allowed/see-coupons" className={`Admin-Product-Button ${SeeCoupons.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>See Coupons</Link>
          {/* @ts-ignore */}
          <Link href="/only-admin-allowed/set-coupon" className={`Admin-Product-Button ${SetCoupons.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Set Coupon</Link>
          </div>
      </div>
    )
}

export default AdminCouponsButtons