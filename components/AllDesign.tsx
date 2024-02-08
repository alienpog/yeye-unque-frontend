import Products from "./Products"
import SectionHeader from "./SectionHeader"

 
function AllDesign() {
  return (
    <div className="header">
      <SectionHeader conheader="Latest Design" red={false}/>
      {/* @ts-ignore */}
      <Products/> 
    </div>
  )
}

export default AllDesign