import {  Rouge_Script , Sacramento } from 'next/font/google';

const sacramento = Sacramento({
    weight: '400',
    subsets: [ 'latin-ext','latin']
  });

interface props{
    conheader : string,
    red:boolean
  
}

function SectionHeader({conheader, red}: props) {
  return (
    <p className={`${ sacramento.className} w-full text-2xl md:text-3xl lg:text-4xl text-center ${red && "text-[#FFD0D0]"}`}>{conheader}</p>
  )
}

export default SectionHeader