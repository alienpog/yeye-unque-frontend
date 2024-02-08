import AdminFreeGift from "@/components/AdminFreeGift"
import AdminProductButton from "@/components/AdminProductButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"

function page() {
  return (
    <div>
        <AdminProductButton/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="See FreeGift"/>
        <AdminFreeGift/>
        </div>
    </div>
  )
}
export default page