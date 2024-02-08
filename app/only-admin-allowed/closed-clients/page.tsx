import AdminClosedCustomer from "@/components/AdminClosedCustomer"
import AdminCustomerButton from "@/components/AdminCustomerButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"

function page() {
  return (
    <div>
        <AdminCustomerButton/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="Closed Clients"/>
        <AdminClosedCustomer/>
        </div>
    </div>
  )
}

export default page