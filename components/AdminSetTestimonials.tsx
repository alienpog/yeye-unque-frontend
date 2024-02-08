"use client"
import BACKEND_URL from "@/src/apiConfig";
import { useAppSelector } from "@/src/redux/hooks";
import { RootState } from "@/src/redux/store";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit";


function AdminSetTestimonials() {
    // error handling
    const [error, setError]=useState("");

    // done handling
    const [done, setDone]=useState("");

    // loading
    const [loading, setLoading] = useState(false);

    // postin data 
    const [clientname, setClientName]= useState("");
    const [clienttestimonial, setClientTestimonial]= useState("");
    const [clientimage, setClientImage]= useState<any>("");
    
    // console.log("
    // console.log("image>>>>",mainimage)
    // console.log("image>>>>",vendorimage)

    const imagesubmit=(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files.length > 0){
            setClientImage(e.target.files[0])
            
        } 
    }
    async function submmitform(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("")
        const formData = new FormData();
      
        // Add text data
        // @ts-ignore
        formData.append('clientname', clientname);
        formData.append('clienttestimonial', clienttestimonial);
        formData.append('clientimage', clientimage); 
     
        try {
          setLoading(true);
          const res = await fetch(`${BACKEND_URL}admintestimonialsubmit/`,{
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            setDone(data);
            setClientName("") 
            setClientTestimonial("")
            setClientImage("")
          } else {
            setError('Failed to submit data to the server.');
          }
        } catch (error) {
          setError('An error occurred while submitting data.');
        } finally {
          setLoading(false);
        }
      }

  return (
    <div>
        {error && <p className="w-full translate-x-7 ml-[200px] text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-2 my-4 rounded-lg z-30">{error}</p> }                    
        { done && <h1 className="w-full translate-x-7 ml-[200px] text-center text-sm font-bold py-2 my-4 text-white bg-[#149512] rounded-lg z-30">{done}</h1>}
        <form className="max-w-[460px] ml-[400px] mx-auto flex flex-col items-center justify-center gap-8 mt-6 mb-4" onSubmit={submmitform}>
        <div className="flex flex-row space-x-4 justify-center items-center">
        <input type="file" id="main-image" onChange={imagesubmit} className="hidden" accept="image/*"/>
        <label htmlFor="main-image" className="text-xs text-[#5D5D5D] px-6 py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition-all duration-500 ease-in-out cursor-pointer">Select Image</label>
        {clientimage? 
        <div className="w-[100px] h-[60px] overflow-hidden rounded-2xl bg-[#E7D6CE]">
        <Image src={URL.createObjectURL(clientimage)} width={500} height={500} alt="image" className=" w-full h-full object-contain"/>
        </div>
        :<p className="text-xs text-red-600">: No Image selected</p>}
        </div>   
        <div className="Admin-inputfield">
        <input type="text" value={clientname} onChange={(e)=>{setClientName(e.target.value),setError(""),setDone("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Client Name"/>
        </div>
        <div className="Admin-inputfield">
        <textarea value={clienttestimonial} onChange={(e)=>{setClientTestimonial(e.target.value),setError(""),setDone("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Client Testimonial" rows={8} cols={40} />
        </div>
        <div className="flex items-center justify-center w-full mt-2 md:mt-4">
        <button className="text-xs text-white font-bold py-2 px-12 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer"
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Save Testimonial"}
        </button>   
        </div>
        </form>
    </div>
  )
}

export default AdminSetTestimonials