import {Sacramento} from 'next/font/google';

const sacramento = Sacramento({
    weight: '400',
    subsets: [ 'latin-ext','latin']
  });

interface Props{
    conheader : string,
}

function AdminHeaderClientDetails({conheader}:{conheader:string}) {
  return (
    <div className='h-[40px] mt-2 text-2xl md:text-3xl lg:text-4xl'>   
    <p className={`${ sacramento.className} translate-x-[500px]`}>{conheader}</p>
    </div>
  )
}

export default AdminHeaderClientDetails