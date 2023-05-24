import { CoreEntity } from "../../common/entities/core.entity"
import { Image } from "../../common/entities/image.entity"; 
import { Variations } from "./variations.entity";
 
export class Products extends CoreEntity  
{ 
    name: string;
    description : string;
    slug: string;
    isNewArrival : boolean;
    type: string;
    image:Image;
    price : number;
    sale_price : number;
    variations : Variations[];
    
    categories: string[];

    
}

 