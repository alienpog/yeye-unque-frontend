import AdminClientDetails from "@/components/AdminClientDetails"
import AdminCustomerButton from "@/components/AdminCustomerButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"

function page() {
  return (
    <div>
        <AdminCustomerButton/>
        <div className="absolute left-[260px] top-[120px]">
        {/* <AdminSectionHeader conheader="Client Profile"/> */}
        <AdminClientDetails/>
        </div>
    </div>
  )
}

export default page