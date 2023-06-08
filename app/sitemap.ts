import { Item} from "@/product";

export default async function sitemap(){
    const baseurl = "http://localhost:3000/";

    const res = await fetch(`http://127.0.0.1:8000/none`,{cache:"no-cache"})
    const data: Item[] = await res.json();
   console.log(data);
    const producturls = data.map((product)=>({
     url: `${baseurl}/productdetails/${product.slug}/`,
    }))
    
    return[
        {url: baseurl, lastModified: new Date(),},
        ...producturls,
        {url: `${baseurl}/faqs`, lastModified: new Date(),},
        {url: `${baseurl}/about-us`, lastModified: new Date(),},
    ]
}