"use client"
import BACKEND_URL from "@/src/apiConfig";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit";

interface Props{
    id: string,
    name: string,
    image: string,
    price: number,
    naira_price: number,
    price_to_pass: number,
    vendor_name: string,
    vendor_image: string,
    Vendor_contact: string,
    vendor_location: string,
    created_at: string,
    updated_at: string,
   
   }

function AdminFreeFormSet() {
    // error handling
    const [error, setError]=useState("");

    // done handling
    const [done, setDone]=useState("");

    // query image file
    const [imageclick, setImageClick]= useState(false);
    const [vendorclick, setVendorClick] = useState(false);
    // loading
    const [loading, setLoading] = useState(false);
    // postin data 
    const [productname, setProductName]= useState("");
    const [productprice, setProductPrice]= useState<any>("");
    const [pricetopass, setPricetoPass]= useState<any>("");
    const [vendorname, setVendorName]= useState<any | null>("");
    const [vendorcontactnumber, setVendorContactNumber]= useState<any | null>("");
    const [mainimage, setMainimage]= useState<any>("");
    const [vendorimage, setVendorImage]= useState<any>("");
    const [vendorlocation, setVendorLocation] = useState<any | null>("");
    
    // console.log("
    // console.log("image>>>>",mainimage)
    // console.log("image>>>>",vendorimage)

    // seach params

    const searchParams = useSearchParams()
    const query = searchParams?.get('id')

    const imagesubmit=(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files.length > 0){
            setMainimage(e.target.files[0])
            setImageClick(true);
        } 
    }
    function vendorsubmmit(e:ChangeEvent<HTMLInputElement>){
        if (e.target.files && e.target.files.length > 0){
            setVendorImage(e.target.files[0])
            setVendorClick(true)
        }
    }
    async function submmitform(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("")
        const formData = new FormData();
      
        // Add text data
        // @ts-ignore
        formData.append('id', query);
        formData.append('name', productname);
        formData.append('price', productprice);
        formData.append('price_to_pass', pricetopass);
        formData.append('vendor_name', vendorname);
        formData.append('Vendor_contact', vendorcontactnumber);
        formData.append('vendor_location', vendorlocation);

        // Add files
        formData.append('image', mainimage);
        formData.append('vendor_image', vendorimage); 
      
        try {
          setLoading(true);
          const res = await fetch(`${BACKEND_URL}adminfreegiftsubmit/`,{
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            setDone(data);
            setProductName("");
            setProductPrice("");
            setPricetoPass("");
            setVendorName("");
            setVendorContactNumber("");
            setMainimage("");
            setVendorImage("");
            setVendorLocation("");  
          } else {
            setError('Failed to submit data to the server.');
          }
        } catch (error) {
          setError('An error occurred while submitting data.');
        } finally {
          setLoading(false);
        }
      }

     useEffect(()=>{
        async function querydata (){
        if(!query)return;
        const res = await fetch(`${BACKEND_URL}adminqueryfreeproduct/${query}`)
        const data:Props = await res.json();
        setProductName(data.name)
        setProductPrice(data.price)
        setPricetoPass(data.price_to_pass)
        setVendorName(data.vendor_name)
        setVendorContactNumber(data.Vendor_contact)
        setMainimage(data.image)
        setVendorImage(data.vendor_image)
        setVendorLocation(data.vendor_location)
        }
        querydata()
     },[query])
  return (
    <div>
        {error && <p className="w-full translate-x-7 text-sm text-white font-semibold text-center bg-[#FFCE00]/70 py-2 my-4 rounded-lg z-30">{error}</p> }                    
        { done && <h1 className="w-full translate-x-7 text-center text-sm font-bold py-2 my-4 text-white bg-[#149512] rounded-lg z-30">{done}</h1>}
        <form className="flex flex-col items-center justify-center gap-8 mt-6 mb-4" onSubmit={submmitform}>
         <div className="w-full pl-12 mx-auto flex flex-row space-x-6">    
        <div className="Admin-inputfield">
        <input type="text" value={productname} onChange={(e)=>{setProductName(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Product Name..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={productprice} onChange={(e)=>{setProductPrice(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Product Price..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={pricetopass} onChange={(e)=>{setPricetoPass(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Price to Pass..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={vendorname} onChange={(e)=>{setVendorName(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Name..."/>
        </div> 
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">   
        <div className="flex flex-row space-x-4 justify-center items-center">
        <input type="file" id="main-image" onChange={imagesubmit} className="hidden" accept="image/*"/>
        <label htmlFor="main-image" className="text-xs text-[#5D5D5D] px-6 py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition-all duration-500 ease-in-out cursor-pointer">Select Main Image</label>
        {mainimage? 
        <div className="w-[100px] h-[60px] overflow-hidden rounded-2xl bg-[#E7D6CE]">
        <Image src={imageclick? URL.createObjectURL(mainimage): mainimage} width={500} height={500} alt="image" className=" w-full h-full object-contain"/>
        </div>
        :<p className="text-xs text-red-600">: No Image selected</p>}
        </div>
        <div className="flex flex-row space-x-4 justify-center items-center">
        <input type="file" id="vendor-image" onChange={vendorsubmmit} className="hidden" accept="image/*"/>
        <label htmlFor="vendor-image" className="text-xs text-[#5D5D5D] px-6 py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition-all duration-500 ease-in-out cursor-pointer">Vendor Image</label>
        {vendorimage?
        <div className="w-[100px] h-[60px] overflow-hidden rounded-2xl bg-[#E7D6CE]">
        <Image src={vendorclick? URL.createObjectURL(vendorimage): vendorimage} width={500} height={500} alt="image" className=" w-full h-full object-contain"/>
        </div>
        :<p className="text-xs text-red-600">: No Image selected</p>}
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={vendorcontactnumber} onChange={(e)=>{setVendorContactNumber(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Contact Number..."/>
        </div>
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row">
        <div className="Admin-inputfield">
        <textarea value={vendorlocation} onChange={(e)=>{setVendorLocation(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Location..." rows={8} cols={40} />
        </div>
        </div>
        <div className="flex items-center justify-center w-full mt-2 md:mt-4">
        <button className="text-xs text-white font-bold py-2 px-12 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer"
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Save Product"}
        </button>   
        </div>
        </form>
    </div>
  )
}

export default AdminFreeFormSet