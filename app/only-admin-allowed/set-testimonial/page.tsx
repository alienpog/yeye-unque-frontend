import AdminSectionHeader from "@/components/AdminSectionHeader"
import AdminSetTestimonials from "@/components/AdminSetTestimonials"
import AdminTestimonialButton from "@/components/AdminTestimonialButton"

function page() {
  return (
    <div>
        <AdminTestimonialButton/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="Set Testimonials"/>
        <AdminSetTestimonials/>
        </div>
    </div>
  )
}

export default page