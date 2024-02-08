import AdminFreeFormSet from "@/components/AdminFreeFromSet"
import AdminProductButton from "@/components/AdminProductButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"


function page() {
  return (
    <div>
    <AdminProductButton/>
    <div className="absolute left-[260px] top-[180px]">
    <AdminSectionHeader conheader="Set FreeGift"/>
    <AdminFreeFormSet/>
    </div>
</div>
  )
}

export default page