import { Item} from "@/product";

export default async function sitemap(){
    const baseurl = "http://localhost:3000";

    const res = await fetch(`${process.env.BACKEND_URL}/none`,{cache:"no-cache"})
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