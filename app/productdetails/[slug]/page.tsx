import ProductDetails from "@/components/ProductDetails";
import { Item, } from "@/product";
import BACKEND_URL from "@/src/apiConfig";
import { Metadata, } from "next";
import { notFound } from "next/navigation";


interface props {
    params:{
        slug: string;
    }
}

export async function generateMetadata(
  { params: {slug}}: props
): Promise<Metadata> {

  const product = await fetchProduct(slug)
 
  if(!product) return {
    title: "Not Found",
    description: "Product not found",
  }
  return {
    title: product.Meta_Title,
    description: product.Meta_description,
    alternates:{
      canonical: `https://yeyeunique.com/productdetails/${slug}`
    },
    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: product.Meta_Title,

      description: product.Meta_description,

      url: "https://yeyeunique.com/productdetails/${slug}",

      siteName: "Yeye Unique",

      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.Meta_Title,
        },
      ],

      locale: "en_US",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title: product.Meta_Title,

      description: product.Meta_description,

      images: [product.image],
    },
  }
}

const fetchProduct = async(slug : string) => {
  const res= await fetch(`${BACKEND_URL}product/${slug}`,{cache:"no-cache"})
  const data : Item = await res.json()
  return data
}



async function Page({params :{slug}}:props) {
    const product = await fetchProduct(slug)

    if(product.id == undefined)return notFound(); 
  return (
    <>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",

            name: product.name,

            image: [product.image],

            description: product.Meta_description,

            sku: product.id,

            brand: {
              "@type": "Brand",
              name: "Yeye Unique",
            },

            offers: {
              "@type": "Offer",

              url: `https://yeyeunique.com/productdetails/${product.slug}`,

              priceCurrency: "NGN",

              price: product.price,

              availability:
                product.stock > 0 
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",

              itemCondition:
                "https://schema.org/NewCondition",
            },
          }),
        }}
      />
      <ProductDetails key={product.id} id={product.id} name={product.name} image={product.image} 
      description={product.description} description_span={product.description_span} video={product.video} measurement={product.measurement}
      price={product.price} old_price={product.old_price} cropimages={product.crop_images}/>
    </>
  )
}

export default Page


export async function generateStaticParams() {
  const res = await fetch(`${BACKEND_URL}none`,{cache:"no-cache"})
  const data: Item[]= await res.json();
  if(!data) return[];
  return data.map((item) =>({
      slug: item.slug,
      
    }))
}
