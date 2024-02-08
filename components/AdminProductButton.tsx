"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function AdminProductButton() {
  const pathname = usePathname();

  const SeeProducts =['/only-admin-allowed']
  const SetProduct =['/only-admin-allowed/set-product']
  const SeeFreeGift =['/only-admin-allowed/see-freegift']
  const SetFreeGift =['/only-admin-allowed/set-freegift']
  const AddProductPrice =['/only-admin-allowed/product-pricing']
  return (
    <div className="w-full fixed left-[260px] top-[65px] z-40 bg-[#75192A] px-6 py-2">
        <div className="max-w-[900px] mx-[56px] flex items-center space-x-4">
          {/* @ts-ignore */}
        <Link href= "/only-admin-allowed" className={`Admin-Product-Button ${SeeProducts.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>See Products</Link>
        {/* @ts-ignore */}
        <Link href="/only-admin-allowed/set-product" className={`Admin-Product-Button ${SetProduct.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Set Product</Link>
        {/* @ts-ignore */}
        <Link  href ="/only-admin-allowed/see-freegift" className={`Admin-Product-Button ${SeeFreeGift.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>See FreeGift</Link>
        {/* @ts-ignore */}
        <Link href="/only-admin-allowed/set-freegift" className={`Admin-Product-Button ${SetFreeGift.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Set FreeGift</Link>
        {/* @ts-ignore */}
        <Link href="/only-admin-allowed/product-pricing" className={`Admin-Product-Button ${AddProductPrice.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Add Product Price</Link>
        </div>
    </div>
  )
}

export default AdminProductButton