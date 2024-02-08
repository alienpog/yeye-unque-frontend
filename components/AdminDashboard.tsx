"use client"
import AdminProductButton from "@/components/AdminProductButton"
import AdminSectionHeader from "@/components/AdminSectionHeader"
import { Props } from "@/product"
import BACKEND_URL from "@/src/apiConfig"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { CursorArrowRaysIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"


function AdminDashboard() {
    // posting
    const [post, setPost]= useState("");
    const [del, setDel]= useState(false);

    // getting Data
    const [data, setData]= useState<Props[]>([])
    
    // changing the background color of item
    const [red, setRed] = useState<any>();

    // routing data
    const router = useRouter();

    function change(id:any) {
        if(red == id){
            setRed(null)  
        }else{
            setRed(id)
        }
    }

    async function deleteproduct (id: any){
      const res = await fetch(`${BACKEND_URL}admindeleteproduct/${id}`,{
        method: "GET",
            headers: {"content-type": "application/json"}
      })
      if(res.status === 200){
       setDel(true)
      }
     }
    useEffect(() =>{
        async function fetchquery(){
            const res = await fetch(`${BACKEND_URL}amdinseeproduct/`)
            const data = await res.json();
            setData(data);
        }
        fetchquery();
    },[del]);

      // Function to format a date string
    const formatDate = (isoDateString: string) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
    
    // seachquery
    async function seachquery(e:FormEvent<HTMLFormElement>){
     e.preventDefault();
     const res = await fetch(`${BACKEND_URL}adminsearch/${post}/`)
     const data = await res.json();
     setData(data);
     setPost("");
    }
    const numberWithCommas = (number: any) => {
      return number?.toLocaleString(); };
  return (
    <div>
        <AdminProductButton/>
        <div className="absolute left-[260px] top-[180px]">
        <AdminSectionHeader conheader="See Products"/>
        <div className="fixed bottom-0 w-full h-[45px] bg-gradient-to-t from-[#F2F2F2] z-20">
        <form className={`absolute bottom-0 -translate-x-40 w-full flex opacity-1 h-[32px] sm:h-[42px] transition-all duration-300 ease-in-out `} onSubmit={seachquery}>
        <div className='w-full h-full max-w-3xl mx-2 sm:mx-4 md:mx-auto md:max-w-2xl flex items-center justify-center space-x-1'>
        <div className="py-1 sm:py-2 pl-2 h-full bg-[#F2F2F2] flex-1 flex items-center justify-start rounded-l-md sm:rounded-l-lg border-2 border-[#E8D7D0]">
        <MagnifyingGlassIcon className="w-3 object-contain mr-1 text-red-300"/>
        <input type="text" value={post} onChange={(e)=>{setPost(e.target.value)}} className=" flex-1 text-black text-xs placeholder-red-300 placeholder:text-[11px] focus:ring-0 outline-none
        border-none  bg-transparent" placeholder="Seach Design..." />
        </div>
        <button type='submit' disabled={!post} className="flex bg-[#E8D7D0] rounded-r-md sm:rounded-r-lg h-full w-9 md:w-10 justify-center items-center border-none outline-none text-black disabled:text-black/10 disabled:cursor-not-allowed hover:text-white transition-all duration-500 ease-in-out">
        <MagnifyingGlassIcon className="w-4 h-4"/></button>
        </div>
      </form>
        </div>
        <div className="flex flex-col space-y-5 px-3 pt-5 overflow-hidden overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin">
        {data.map((item) => <div key = {item.id} className={` w-full flex flex-col ${red == item.id ? "bg-[#75192A]":" bg-[#E7D6CE]"} py-5 drop-shadow-lg rounded-lg transition-all duration-500 ease-in-out`}>
        <div className={`w-full ${red == item.id ? "text-[#E7D6CE]":" text-[#75192A]"} flex h-[10px] flex-row item-center space-x-6 text-center text-xs font-light mb-6`}>
            <p className="Admin-Table-H">Product Image</p>
            <p className="Admin-Table-H">Product Name</p>
            <p className="Admin-Table-H">Product Price</p>
            <p className="Admin-Table-H">Old Price</p>
            <p className="Admin-Table-H">Vendor Price</p>
            <p className="Admin-Table-H">LIkes</p>
            <p className="Admin-Table-H">Description</p>
            <p className="Admin-Table-H">Description Bold</p>
            <p className="Admin-Table-H">Type</p>
            <p className="Admin-Table-H">Category</p>
            <p className="Admin-Table-H">Hot Product</p>
            <p className="Admin-Table-H">Special</p>
            <p className="Admin-Table-H">Out of Product</p>
            <p className="Admin-Table-H">Meta Title</p>
            <p className="Admin-Table-H">Meta Description</p>
            <p className="Admin-Table-H">Vendor Name</p>
            <p className="Admin-Table-H">Vendor Contact</p>
            <p className="Admin-Table-H">Vendor Location</p>
            <p className="Admin-Table-H">Measurement</p>
            <p className="Admin-Table-H">Created On</p>
            <p className="Admin-Table-H">Updated On</p>
        </div>
        <div className={`flex flex-row item-center space-x-6 text-center text-xs ${red == item.id ? "text-[#ffff]":" text-[#00000]"}`}>
            <div className="Admin-Table-H flex flex-col justify-center items-center">
                <div className="my-1 relative ">
                <span className=' absolute top-[-2px] right-[-10px] bg-[#FF0101] w-[24px] h-[24px] flex items-center justify-center text-white text-[12px] rounded-lg'>{item.id}</span>
                 <div className="h-[60px] w-[50px] overflow-hidden rounded-3xl">
                 <Image src={item.image} alt="image" width={500} height={500} className="w-full h-full object-cover z-20"/>
                 </div>
                </div>
                <div className="Admin-Pin" onClick={()=>change(item.id)}>
                {red == item.id ?<p>Unpin Me</p>:<><CursorArrowRaysIcon className="w-3 h-3"/>
                <p>Pin Me</p></>}
                </div>
                <div className="Admin-Pin" onClick={()=>router.push(`/only-admin-allowed/set-product/?id=${item.id}`)}>
                <PencilSquareIcon className="w-3 h-3"/>    
                <p>Edit</p>
                </div>
                <div className="Admin-Pin"onClick={()=>{setDel(false), deleteproduct(item.id)}}>
                <TrashIcon className="w-3 h-3"/>    
                <p>Delete</p>
                </div>
            </div>
            <div className="min-w-[250px] max-w-[300px] text-center">{item.name}</div>
            <p className="Admin-Table-H"><span className='line-through'>N</span>{numberWithCommas(item.price)}</p>
            <p className="Admin-Table-H"><span className='line-through'>N</span>{numberWithCommas(item.old_price)}</p>
            <p className="Admin-Table-H">{item.vendor_price && <><span className='line-through'>N</span></>}{numberWithCommas(item.vendor_price)}</p>
            <p className="Admin-Table-H">{item.liked}</p>
            <p className="Admin-Table-H">{item.description}</p>
            <p className="Admin-Table-H">{item.description_span}</p>
            <p className="Admin-Table-H">{item.type}</p>
            <p className="Admin-Table-H">{item.category}</p>
            <p className="Admin-Table-H">{item.hot ?"True":"False"} </p>
            <p className="Admin-Table-H">{item.special ?"True":"False"}</p>
            <p className="Admin-Table-H">{item.out_of_product ?"True":"False"}</p>
            <p className="Admin-Table-H">{item.Meta_Title}</p>
            <p className="Admin-Table-H">{item.Meta_description}</p>
            <p className="Admin-Table-H">{item.vendor_name}</p>
            <p className="Admin-Table-H">{item.Vendor_contact}</p>
            <p className="Admin-Table-H">{item.vendor_location}</p>
            <p className="Admin-Table-H">{item.measurement ?"True":"False"}</p>
            <p className="Admin-Table-H">{formatDate(item.created_on)}</p>
            <p className="Admin-Table-H">{formatDate(item.updated_on)}</p>
        </div>
        </div>)}
        </div>
        </div>
    </div>
  )
}
export default AdminDashboard