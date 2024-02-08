import { Item2 } from '@/product';
import ProductItem from './ProductItem';
import MiniCon from './MiniCon';
import Button from './Button';
import BACKEND_URL from '@/src/apiConfig';


const queryproducts = async() => {
  //  next:{revalidate:60*60*24}
  // ${process.env.BACKEND_URL}
  const res = await fetch(`${BACKEND_URL}allproducts/`, {cache:"no-cache"});
  const products : Item2 = await res.json();
  return products;

}

async function Products() {
 const products = await queryproducts();
  // get random index value
  const randomProducts = products.results.sort(() => Math.random() - 0.5)

  return (
    <MiniCon>
    <div className='DesignCon'>{randomProducts.splice(0,8).map(({id,name,image,price,old_price,modelimages,slug, measurement})=>(
        <ProductItem key={id} id={id} name={name} image={image} price={price} modelimages={modelimages} old_price={old_price} slug={slug} measurement={measurement} truecon={false}/>
    ))}
    </div>
    <Button/> 
    </MiniCon>
  )
}

export default Products