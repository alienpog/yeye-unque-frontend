export interface Item{
  
    id: number,
    name: string,
    price: number,
    old_price: number | null,
    description: string,
    image: string,
    likescount?: number,
    modelimages?: [object],
    crop_images?: [object] 
}


export interface Item2{
  count: number;
  next?:string;
  previous?:string;
  results:[{
    id: number,
    name: string,
    price: number,
    old_price: number | null,
    description: string,
    image: string,
    likescount?: number,
    modelimages?: [object],
    crop_images?: [object] 
  }]
}

