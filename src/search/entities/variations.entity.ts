import { CoreEntity } from "../../common/entities/core.entity";
import { Attribute } from "./attribute.entity";

export class Variations extends CoreEntity  
{ 
    value : string;
    attribute : Attribute;
    

    
}
