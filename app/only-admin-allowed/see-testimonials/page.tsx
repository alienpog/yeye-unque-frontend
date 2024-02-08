import AdminSectionHeader from "@/components/AdminSectionHeader"
import AdminSeeTestimonials from "@/components/AdminSeeTestimonials"
import AdminTestimonialButton from "@/components/AdminTestimonialButton"

function page() {
  return (
    <div>
        <AdminTestimonialButton/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="See Testimonials"/>
        <AdminSeeTestimonials/>
        </div>
    </div>
  )
}

export default page