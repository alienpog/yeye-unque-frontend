import AdminCouponsButtons from "@/components/AdminCouponsButtons"
import AdminSectionHeader from "@/components/AdminSectionHeader"
import AdminSetCoupon from "@/components/AdminSetCoupon"

function page() {
  return (
    <div>
        <AdminCouponsButtons/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="Set Coupons"/>
        <AdminSetCoupon/>
        </div>
    </div>
  )
}

export default page