 
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from './user.entity';
import { Image } from 'src/common/entities/image.entity';
 
 
export class Profile extends CoreEntity {
 
 
  avatar?: Image;
  
  bio?: string;
 
  socials?: Social[];
 
  contact?: string;
 
  customer?: User;
}

 
export class Social {

  type: string;
  link: string;
}
 

