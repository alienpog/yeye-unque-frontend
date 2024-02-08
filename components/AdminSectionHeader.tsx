import {Sacramento} from 'next/font/google';

const sacramento = Sacramento({
    weight: '400',
    subsets: [ 'latin-ext','latin']
  });

interface Props{
    conheader : string,
}
function AdminSectionHeader({conheader}: Props) {
    return (
    <div className='w-full h-[70px] fixed top-[100px] pt-[20px] text-2xl md:text-3xl lg:text-4xl text-center z-20 bg-[#F2F2F2] shadow-lg'>   
    <p className={`${sacramento.className} -translate-x-40`}>{conheader}</p>
    </div>
  );
}

export default AdminSectionHeader