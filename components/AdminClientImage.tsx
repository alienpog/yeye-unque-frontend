import Image from "next/image"

function AdminClientImage({image}:{image:string}) {
    const clean01= image?.replace("https://yeyeproductimages.s3.amazonaws.com/https%3A/","https://")
    const clean02= clean01?.replace("%3D","=")
  return (
    <><Image src={clean02} alt="image" width={500} height={500} className="w-full h-full object-cover z-20"/></>
  )
}

export default AdminClientImage