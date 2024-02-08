import AdminFormSet from '@/components/AdminFormSet'
import AdminProductButton from '@/components/AdminProductButton'
import AdminSectionHeader from '@/components/AdminSectionHeader'

function page() {
  return (
    <div>
        <AdminProductButton/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="Set Product"/>
        <AdminFormSet/>
        </div>
    </div>
  )
}

export default page