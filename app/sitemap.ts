import { Item} from "@/product";
import BACKEND_URL from "@/src/apiConfig";

export default async function sitemap(){
    const baseurl = "https://yeyeunique.com";
    // https://yeye-unique-backend-production.up.railway.app/
    const res = await fetch(`${BACKEND_URL}none`,{cache:"no-cache"})
    const data: Item[] = await res.json();
    const producturls = data.map((product)=>({
     url: `${baseurl}/productdetails/${product.slug}/`,lastModified: new Date()
    }))
    
    return[
        {url: baseurl, lastModified: new Date(),},
        ...producturls,
        {url: `${baseurl}/faqs`, lastModified: new Date(),},
        {url: `${baseurl}/about-us`, lastModified: new Date(),},
    ]
}