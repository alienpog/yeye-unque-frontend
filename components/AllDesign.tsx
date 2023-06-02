import Products from "./Products"
import SectionHeader from "./SectionHeader"

 
function AllDesign() {
  return (
    <div className="header">
      <SectionHeader conheader="latest Design" red={false}/>
      {/* @ts-ignore */}
      <Products/> 
    </div>
  )
}

export default AllDesign