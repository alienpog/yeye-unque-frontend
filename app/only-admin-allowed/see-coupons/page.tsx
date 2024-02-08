import AdminCouponsButtons from "@/components/AdminCouponsButtons"
import AdminSectionHeader from "@/components/AdminSectionHeader"
import AdminSeeCoupons from "@/components/AdminSeeCoupons"

function page() {
  return (
    <div>
        <AdminCouponsButtons/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="See Coupons"/>
        <AdminSeeCoupons/>
        </div>
    </div>
  )
}

export default page