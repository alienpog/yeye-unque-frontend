import AdminProductButton from "@/components/AdminProductButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"
import AdminSetPrice from "@/components/AdminSetPrice"

function page() {
  return (
    <div>
        <AdminProductButton/>
        <div className="absolute left-[260px] top-[180px] mx-auto max-w-[1000px] w-full">
        <AdminSectionHeader conheader="Set Product Price"/>
        <AdminSetPrice/>
        </div>
    </div>
  )
}

export default page