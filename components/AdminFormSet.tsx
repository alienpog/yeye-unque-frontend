"use client"
import { Props } from "@/product";
import BACKEND_URL from "@/src/apiConfig";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ClassicSpinner } from "react-spinners-kit";

function AdminFormSet() {
    // error handling
    const [error, setError]=useState("");

    // done handling
    const [done, setDone]=useState("");

    // query image file
    const [imageclick, setImageClick]= useState(false);
    const [imagesclick, setImagesClick]= useState(false);
    const [vendorclick, setVendorClick] = useState(false);
    // loading
    const [loading, setLoading] = useState(false);
    // postin data 
    const [productname, setProductName]= useState("");
    const [productprice, setProductPrice]= useState<any>("");
    const [productoldprice, setProductOldPrice]= useState<any>("");
    const [vendorname, setVendorName]= useState<any | null>("");
    const [metatitle, setMetaTitle]= useState<any | null>("");
    const [vendorcontactnumber, setVendorContactNumber]= useState<any | null>("");
    const [vendorprice, setVendorPrice]= useState<any | null>("");
    const [selecttype, setSelectType]= useState<any | null>("female");
    const [video, setVideo]= useState<any | null>();
    const [mainimage, setMainimage]= useState<any>();
    const [vendorimage, setVendorImage]= useState<any>();
    const [listimage, setListimage]= useState<any[]>([]);
    const [imageURLs, setImageURLs] = useState<any[]>([]);
    const [productdescription, setProductDescription] = useState("");
    const [productboldescription, setProductBoldDescription] = useState("");
    const [metadescription, setMetaDescription] = useState("");
    const [vendorlocation, setVendorLocation] = useState<any | null>("");
    const [categorys, setCategorys] = useState<any | null>("");
    const [specialproduct, setSpecialProduct] = useState(false);
    const [hotproduct, setHotProduct] = useState(false);
    const [outproduct, setOutProduct] = useState(false);
    const [measurement, setMeasurement] = useState(false);
    
    // console.log("
    // console.log("image>>>>",mainimage)
    // console.log("image>>>>",listimage)
    // console.log("image>>>>",video)
    // console.log("image>>>>",vendorimage)
    // seach params

    const searchParams = useSearchParams()
    const query = searchParams?.get('id')
    // if(query){
    //    const treatimage = mainimage.replace("https://yeyeproductimages.s3.amazonaws.com/","");
    //    const treatimages: any[]= [];
    //     listimage.map((image) =>treatimages.push(image.replace("https://yeyeproductimages.s3.amazonaws.com/","")))
    //    const treatvideo = video.replace("https://yeyeproductimages.s3.amazonaws.com/","")
    //    const treatvendor = vendorimage.replace("https://yeyeproductimages.s3.amazonaws.com/","")
    //    console.log("treatvideo>>",treatvideo)
    //    console.log("treatimages>>",treatimages)
    //    console.log("treatvendor>>",treatvendor)
    //    console.log("treatimage>>",treatimage)
     
    // }else return;
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
    function videosubmmit(e:ChangeEvent<HTMLInputElement>){
        if (e.target.files){ 
            setVideo(e.target.files[0])
        }
    }
    function listimagesubmmit(e:ChangeEvent<HTMLInputElement>){
        // @ts-ignore
        setListimage([...e.target.files]);
        setImagesClick(true)
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
        formData.append('old_price', productoldprice);
        formData.append('vendor_price', vendorprice);
        formData.append('description', productdescription);
        formData.append('description_span', productboldescription);
        formData.append('type', selecttype);
        formData.append('category', categorys);
        formData.append('hot', hotproduct.toString());
        formData.append('special', specialproduct.toString());
        formData.append('out_of_product', outproduct.toString());
        formData.append('Meta_Title', metatitle);
        formData.append('Meta_description', metadescription);
        formData.append('vendor_name', vendorname);
        formData.append('Vendor_contact', vendorcontactnumber);
        formData.append('vendor_location', vendorlocation);
        formData.append('measurement', measurement.toString());
      
        // Add files
        formData.append('image', mainimage);
        formData.append('vendor_image', vendorimage);
        formData.append('video', video);
        
        // Add list of images
        listimage.forEach((file, index) => {
            formData.append(`images[]`, file);
        }); 
        
        try {
          setLoading(true);
          const res = await fetch(`${BACKEND_URL}adminproductsubmit/`, {
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            setDone(data);
            // setListimage([]);
            // setVendorImage("");
            // setImageURLs([]);
            // setVideo("");
            // setMainimage("");
            
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
        if (imagesclick == true && listimage.length > 1){
         const newImageUrls: any[] = [];
         listimage.forEach(image => newImageUrls.push(URL.createObjectURL(image))); setImageURLs (newImageUrls)
        }else  return;

    },[listimage,imagesclick])

     useEffect(()=>{
        async function querydata (){
        if(!query)return;
        const res = await fetch(`${BACKEND_URL}amdinqueryproduct/${query}`)
        const data:Props = await res.json();
        setProductName(data.name)
        setProductPrice(data.price)
        setProductOldPrice(data.old_price)
        setVendorName(data.vendor_name)
        setMetaTitle(data.Meta_Title)
        setVendorContactNumber(data.Vendor_contact)
        setVendorPrice(data.vendor_price)
        setSelectType(data.type)
        setVideo(data.video)
        setMainimage(data.image)
        setVendorImage(data.vendor_image)
        setListimage(data.images)
        setProductDescription(data.description)
        setProductBoldDescription(data.description_span)
        setMetaDescription(data.Meta_description)
        setVendorLocation(data.vendor_location)
        setCategorys(data.category)
        setSpecialProduct(data.special)
        setHotProduct(data.hot)
        setOutProduct(data.out_of_product)
        setMeasurement(data.measurement)
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
        <input type="text" value={productoldprice} onChange={(e)=>{setProductOldPrice(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Product Old Price..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={vendorname} onChange={(e)=>{setVendorName(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Name..."/>
        </div> 
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">    
        <div className="Admin-inputfield">
        <input type="text" value={metatitle} onChange={(e)=>{setMetaTitle(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Meta Title..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={vendorcontactnumber} onChange={(e)=>{setVendorContactNumber(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Contact Number..."/>
        </div>
        <div className="Admin-inputfield">
        <input type="text" value={vendorprice} onChange={(e)=>{setVendorPrice(e.target.value),setError("")}} className=" flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Price..."/>
        </div>
        <div className="relative">
            <select value={selecttype} onChange={(e)=>setSelectType(e.target.value)} className="w-[250px] rounded-lg border-2 border-[#E7D6CE] appearance-none text-xs text-black px-6 py-3 bg-transparent outline-none drop-shadow-lg">
                <option>female</option>
                <option>male</option>
                <option>kid</option>
                <option>men-shoe</option>
                <option>men-cap</option>
                <option>jewelry</option>
                <option>watches</option>
                <option>women-bag</option>
            </select>
            <ChevronDoubleDownIcon className="w-4 h-4 text-[#ff0000] absolute bottom-3 right-2" />
        </div> 
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">    
        <div className="flex flex-row space-x-4 justify-center items-center">
        <input type="file" id="video" onChange={videosubmmit} className="hidden"/>
        <label htmlFor="video" className="text-xs text-[#5D5D5D] px-6 py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition-all duration-500 ease-in-out cursor-pointer">Select Video</label>
        {video? <><p className="text-xs text-green-600">: Video selected</p></>:<p className="text-xs text-red-600">: No video selected</p>}
        </div>
        <div className="flex flex-row space-x-4 justify-center items-center">
        <input type="file" id="main-image" onChange={ imagesubmit} className="hidden" accept="image/*"/>
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
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">    
        <div className="flex flex-row flex-wrap space-x-6 space-y-4 justify-start items-center">
        <input type="file" multiple id="list-images" onChange={listimagesubmmit} className="hidden" accept="image/*"/>
        <label htmlFor="list-images" className="text-xs text-[#5D5D5D] px-6 py-2 bg-[#E7D6CE] rounded-full drop-shadow-lg hover:drop-shadow-none transition-all duration-500 ease-in-out cursor-pointer">Select More Images</label>
        {imagesclick? (imageURLs && imageURLs.map((image01 :any)=> <div className="w-[100px] h-[60px] overflow-hidden rounded-2xl bg-[#E7D6CE]">
        <Image src={image01} width={500} height={500} alt="image" className=" w-full h-full object-contain"/>
        </div>)):(
        // If imagesClick is false or null, map through listimage
        listimage.map((image01) => (
            <div className="w-[100px] h-[60px] overflow-hidden rounded-2xl bg-[#E7D6CE]" key={image01}>
            <Image src={image01} width={500} height={500} alt="image" className="w-full h-full object-contain" />
            </div>
        ))
        )}
        {imageURLs.length == 0 && listimage.length == 0 && <p className="text-xs text-red-600">: No Images selected</p>}
        </div>
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">
        <div className="Admin-inputfield">
        <textarea value={productdescription} onChange={(e)=>{setProductDescription(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Product Description...." rows={8} cols={40} />
        </div>
        <div className="Admin-inputfield">
        <textarea value={productboldescription} onChange={(e)=>{setProductBoldDescription(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Product Bold Description...." rows={8} cols={40} />
        </div>
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">
        <div className="Admin-inputfield">
        <textarea value={metadescription} onChange={(e)=>{setMetaDescription(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Meta Description..." rows={8} cols={40} />
        </div>
        <div className="Admin-inputfield">
        <textarea value={vendorlocation} onChange={(e)=>{setVendorLocation(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Vendor Location ..." rows={8} cols={40} />
        </div>
        </div>
        <div className="w-full pl-12 mx-auto flex flex-row space-x-6">
        <div className="Admin-inputfield basis-1/2">
        <textarea value={categorys} onChange={(e)=>{setCategorys(e.target.value),setError("")}} className=" textarea flex-1 text-black text-xs placeholder-red-300 focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Enter Categorys..." rows={8} cols={40} />
        </div>
        <div className="basis-1/2 text-xs text-black font-medium flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
                <p>Special Product</p>
                <div className={`w-4 h-4 rounded-full border-2 specialproduct cursor-pointer ${!specialproduct?"border-[#E7D6CE]": "bg-[#ff0000]" }`} onClick={()=>setSpecialProduct((prev)=>!prev)}/>
            </div>
            <div className="flex items-center space-x-2">
                <p>Hot Product</p>
                <div className={`w-4 h-4 rounded-full border-2 specialproduct cursor-pointer ${!hotproduct?"border-[#E7D6CE]": "bg-[#ff0000]" }`} onClick={()=>setHotProduct((prev)=>!prev)}/>
            </div>
            <div className="flex items-center space-x-2">
                <p>Out of Product</p>
                <div className={`w-4 h-4 rounded-full border-2 specialproduct cursor-pointer ${!outproduct?"border-[#E7D6CE]": "bg-[#ff0000]" }`} onClick={()=>setOutProduct((prev)=>!prev)}/>
            </div>
            <div className="flex items-center space-x-2">
                <p>Measurement</p>
                <div className={`w-4 h-4 rounded-full border-2 specialproduct cursor-pointer ${!measurement?"border-[#E7D6CE]": "bg-[#ff0000]" }`} onClick={()=>setMeasurement((prev)=>!prev)}/>
            </div>
        </div>
        </div>
        <div className="flex items-center justify-center w-full mt-2 md:mt-4">
        <button className="text-xs text-white font-bold py-2 px-12 bg-[#9C0F0F] 
        rounded-full text-center shadow-md hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer "
        type="submit">
            {loading?<ClassicSpinner size={15} color="white"/>:"Save Product"}
        </button>   
        </div>
        </form>
    </div>
  )
}

export default AdminFormSet