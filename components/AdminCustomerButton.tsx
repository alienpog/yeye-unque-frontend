"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminCustomerButton() {
  const pathname = usePathname();

  const ClosedClients =['/only-admin-allowed/closed-clients','/only-admin-allowed/client-details']
  const ContactClients =['/only-admin-allowed/contact-clients']
  return (
    <div className="w-full fixed left-[260px] top-[65px] z-40 bg-[#75192A] px-6 py-2">
        <div className="max-w-[900px] mx-[56px] flex items-center space-x-4">
          {/* @ts-ignore */}
        <Link href= "/only-admin-allowed/closed-clients" className={`Admin-Product-Button ${ClosedClients.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Closed Clients</Link>
        {/* @ts-ignore */}
        <Link href="/only-admin-allowed/contact-clients" className={`Admin-Product-Button ${ContactClients.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Contact Clients</Link>
        </div>
    </div>
  )
}

export default AdminCustomerButton