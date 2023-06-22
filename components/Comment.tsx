import moment from 'moment';

interface props{
    name: string,
    text: string,
    image?: string,
    time:string,
    details:boolean,
}
function Comment({name, text, image, time, details}: props) {
  const clean01= image?.replace("https://yeyeproductimages.s3.amazonaws.com/https%3A/","https://")
  const clean02= clean01?.replace("%3D","=")
  return (
    <>
        
        <div className=" w-full flex items-start space-x-2 mb-3">
            <img src={clean02 || "/images/Avatar-Profile-PNG.png"} alt={name} width={20}height={20} className=" object-contain rounded-full" />
            <p className="text-xs text-black  font-light">{name}</p>
            <p className="text-xs text-[#323232] font-semibold ">{text}</p>
          { details && <p className='flex-1 text-[10px] font-light ml-auto text-right  '>{moment(time).fromNow()}</p>} 

        </div>
    </>
  )
}

export default Comment