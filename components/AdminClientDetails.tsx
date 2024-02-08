"use client"

import AdminClientImage from "./AdminClientImage"
import {useSearchParams } from "next/navigation"
import {useEffect, useState } from "react"
import BACKEND_URL from "@/src/apiConfig"
import AdminHeaderClientDetails from "./AdminHeaderClientDetails"
import AdminClientProduct from "./AdminClientProduct"

interface Props{
    image: string,
    name: string,
    price?: number,
    quantity: number,
    processing: string,    
    total_value?: number,
    measurement?: boolean,
    vendor_name?: string,
    Vendor_contact?: string,
    vendor_location?: string,
    schedule_date?:string,
    discussion?: string,
    created_at: string,
    updated_at: string,
    id:number,
    vendor_image?: string,
    vendor_price?:string,
    total_money:number,
    shipping_call:boolean,
   }

function AdminClientDetails() {
    // data query
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [address, setAddress] = useState("")
    const [clientspent, setClientSpent] = useState()
    const [useramount, setUserAmount] = useState("")
    const [shippingcall, setShippingCall] = useState()

    const searchParams = useSearchParams()
    const query = searchParams?.get('id')

    // discount 
    const [discount, setDiscount] = useState<any>()

    useEffect(()=>{
        async function queryclient(){
            const res = await fetch(`${BACKEND_URL}adminqueryclientdetails/${query}`)
            const data = await res.json()
            setImage(data.image) 
            setName(data.name)
            setEmail(data.email)
            setNumber(data.phone_number)
            setAddress(data.location)
            setClientSpent(data.total_money)
            setUserAmount(data.total_price)
            setShippingCall(data.shipping_call)

            
        }
        queryclient()
    },[query])



  // getting Data
  const [data, setData]= useState<Props[]>([])


// deleting freegift
  useEffect(() =>{
      async function fetchquery(){
          const res = await fetch(`${BACKEND_URL}admingetclientproducts/${query}`)
          const data = await res.json();
          setData(data);
      }
      fetchquery();
  },[query]);

    const numberWithCommas = (number: any) => {
        return number?.toLocaleString();};
    
// @ts-ignore
    const our_price = data.reduce((total, product) => total + product.total_value, 0);

    useEffect(()=>{
        // .toFixed(2)
            setDiscount(our_price - (our_price * 0.1))
        },
        [our_price])    
  return (
    <div>
    <div className="w-full fixed flex flex-col space-y-6 z-10 bg-[#F2F2F2] -mt-4 pt-2 drop-shadow-lg">
    <div className="flex flex-row items-center space-x-[200px] pl-6 mt-2 ">
        <div className="flex flex-col justify-center items-center space-y-1">
            <div className="h-[70px] w-[80px] overflow-hidden rounded-3xl relative">
            <AdminClientImage image={image}/>
            {clientspent == 0 && <p className="absolute bottom-0 bg-[#ff0000] py-[1px] w-full text-white text-center text-xs font-semibold">New</p>}
            </div>
            <p className="text-black text-xs font-semibold">{name}</p>
            <p className=" text-[#605C5A] text-[10px] font-medium">{email}</p>
            <p className="text-[#605C5A] text-[10px] font-medium"><span className='line-through'>N</span>{numberWithCommas(clientspent)}</p>
            <p className="text-[#ff0000] text-[10px] font-medium">{number}</p>
        </div>
        <div className="flex flex-col justify-center items-start space-y-1">
            <p className="text-black text-[10px] ">Products :<span className="text-[#ff0000] font-medium">{" "}{data.length}</span></p>
            <p className="text-black text-[10px] ">Shipping Call :<span className="text-[#ff0000] font-medium">{" "}{shippingcall? "True": "False"}</span></p>
            <p className="text-black text-[10px] ">Our Price :<span className="text-[#ff0000] font-medium">{" "}<span className='line-through'>N</span>{numberWithCommas(our_price)} - 10% = <span className='line-through'>N</span>{numberWithCommas(discount)}</span></p>
            <p className="text-black text-[10px] ">User Price :<span className="text-[#ff0000] font-medium">{" "}<span className='line-through'>N</span>{numberWithCommas(useramount)}</span></p>
        </div>
        <p className="text-xs text-black max-w-[300px]">{address}</p>
    </div>
    <AdminHeaderClientDetails conheader="Client Products"/>
    </div>
    <div>    
        <div className="absolute left-0 top-[220px] flex flex-col space-y-5 px-3 overflow-hidden overflow-x-scroll scrollbar-thumb-rounded-md scrollbar-thumb-[#E7D6CE] scrollbar-thin">
      {data.map((item) => <AdminClientProduct item={item} key ={item.id}/>)}
      </div>
    </div>
    </div>
  )
}

export default AdminClientDetails