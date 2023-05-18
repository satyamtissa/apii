import { CoreEntity } from "../../common/entities/core.entity"
import { Image } from "../../common/entities/image.entity"; 
 
export class Categories extends CoreEntity  
{ 
    name: string;
    slug: string;
    productCount:number;
    icon: string;
    tags: string[];
    image:Image;
}

 