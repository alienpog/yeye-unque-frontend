import { Item } from "@/product";

export default async function sitemap(){
    const baseurl = "http://localhost:3000/";

    const res = await fetch(`http://127.0.0.1:8000/product/none/`)
    const data: Item[] = await res.json();
    const producturls = data.map((product)=>({
     url: `${baseurl}/productdetails/${product.id}/`
    }))
    return[
        {url: baseurl },
        ...producturls
    ]
}