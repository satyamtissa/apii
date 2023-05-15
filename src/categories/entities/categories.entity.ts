import { CoreEntity } from "src/common/entities/core.entity"
import { Image } from "src/common/entities/image.entity"; 
 
export class Categories extends CoreEntity  
{ 
    name: string;
    slug: string;
    productCount:number;
    icon: string;
    tags: string[];
    image:Image;
}

 