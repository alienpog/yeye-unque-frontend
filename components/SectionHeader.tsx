import {  Rouge_Script , Sacramento } from 'next/font/google';

const sacramento = Sacramento({
    weight: '400',
    subsets: [ 'latin-ext']
  });

  const rouge =  Rouge_Script ({
    weight: '400',
    subsets: [ 'latin']
  });
interface props{
    conheader : string,
    red:boolean
  
}


function SectionHeader({conheader, red}: props) {
  return (
    <h1 className={` ${ sacramento.className} text-2xl md:text-3xl lg:text-4xl text-center ${red && "text-[#FFD0D0]"} `}>{conheader}</h1>
  )
}

export default SectionHeader