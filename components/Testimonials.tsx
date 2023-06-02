import MiniCon from "./MiniCon"
import SectionHeader from "./SectionHeader"
import Testimonial from "./Testimonial"

interface testimonials {
  client_comment: string,
  client_picture: string,
  client_name:string
}

const fetchtestimonials = async() => {
 const res = await fetch("http://127.0.0.1:8000/testimonials/",{cache:"no-cache"})
 const data : testimonials[] = await res.json()
 return data
}

async function Testimonials() {
  const testimonials= await fetchtestimonials() 
  const randomTestimonials = testimonials.sort(() => Math.random() - 0.5)
  return (
    <>
        <div className="header">
        <SectionHeader conheader="Testimonials" red={false}/>
        <MiniCon>    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                gap-2 md:gap-4 lg:gap-10 max-w-6xl mx-auto mb-9">
                 {testimonials.splice(0,6).map((item, index) => (
                   <Testimonial key={index} comment={item.client_comment} image={item.client_picture} name ={item.client_name} id={index} />
                 ))}
        
            </div>
        </MiniCon>
        </div>   
    </>
  )
}

export default Testimonials