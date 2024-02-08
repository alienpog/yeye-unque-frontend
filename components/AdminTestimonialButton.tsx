"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminTestimonialButton() {
    const pathname = usePathname();

    const SeeTestimonial =['/only-admin-allowed/see-testimonials']
    const SetTestimonial =['/only-admin-allowed/set-testimonial']
    return (
        <div className="w-full fixed left-[260px] top-[65px] z-40 bg-[#75192A] px-6 py-2">
                <div className="max-w-[900px] mx-[56px] flex items-center space-x-4">
                    {/* @ts-ignore */}
                    <Link href= "/only-admin-allowed/see-testimonials" className={`Admin-Product-Button ${SeeTestimonial.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>See Testimonial</Link>
                    {/* @ts-ignore */}
                    <Link href="/only-admin-allowed/set-testimonial" className={`Admin-Product-Button ${SetTestimonial.includes(pathname) && "bg-[#E7D6CE] text-[#716B68]"}`}>Set Testimonial</Link>
                </div>
        </div>
    )
}

export default AdminTestimonialButton
