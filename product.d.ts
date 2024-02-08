export interface Item{
  
    id: number,
    name: string,
    price: number,
    old_price: number | null,
    description: string,
    description_span?: string;
    image: string,
    likescount?: number,
    modelimages?: string[],
    crop_images?: string[],
    measurement: boolean,
    video?: string,
    slug?: string,
    Meta_Title?: string,
    Meta_description?: string,
}


export interface Item2{
  count: number;
  next?:string;
  previous?:string;
  results:[{
    id: number,
    name: string,
    price: number,
    old_price: number | null,
    description: string,
    description_span?: string;
    image: string,
    likescount?: number,
    modelimages?: string[],
    crop_images?: string[],
    measurement: boolean,
    video?: string,
    slug?:string 
  }]
}


export interface Props{
  id:number
  name:string
  image:string
  price:number
  old_price:number
  vendor_price?:number
  images:string[]
  liked:number
  description:string
  description_span:string
  type:string
  category?:string
  hot:boolean
  special:boolean
  out_of_product:boolean
  Meta_Title:string
  Meta_description:string
  vendor_name?:string
  vendor_image?:string
  Vendor_contact?:string
  vendor_location?:string
  video?: string,
  measurement:boolean
  created_on:string
  updated_on:string
}

