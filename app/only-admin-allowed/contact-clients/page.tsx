import AdminContactClient from "@/components/AdminContactClient"
import AdminCustomerButton from "@/components/AdminCustomerButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"

function page() {
  return (
    <div>
        <AdminCustomerButton/>
        <div className="absolute left-[260px] top-[180px]">
          <AdminSectionHeader conheader="Contact Clients"/>
          <AdminContactClient/>
        </div>
    </div>
  )
}

export default page