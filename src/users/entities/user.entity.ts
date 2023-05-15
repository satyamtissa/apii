import { Address } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
// import { Order } from 'src/orders/entities/order.entity';

import { Profile } from './profile.entity';
 
 
export class User extends CoreEntity {
  
  name: string; 
  email: string; 
  password?: string; 
  shop_id?: number;  
  profile?: Profile; 
  token:string;
  is_active?: boolean = true; 
  address?: Address[];
  billing_address? : Address;
  shipping_address? : Address;
}
