import { CoreEntity } from "src/common/entities/core.entity"
import { Image } from "src/common/entities/image.entity"; 
import { Variations } from "./variations.entity";
 
export class Products extends CoreEntity  
{ 
    name: string;
    description : string;
    slug: string;
    isNewArrival : boolean;
    image:Image;
    price : number;
    sale_price : number;
    variations : Variations[];

    
}

 