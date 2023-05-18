import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';

 


 
export class UserAddress {
   
  street_address: string;
  
  country: string;
 
  city: string;
   
  state: string;
 
  zip: string;
}
 

 

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}
 
 
export class Address extends CoreEntity {
  
  title: string;
 
  default: boolean;
 
  address: UserAddress;

  
  type: AddressType;
 
  customer: User;
}
 

