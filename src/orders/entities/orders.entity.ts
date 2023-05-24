import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';

 
import { Products } from '../../products/entities/products.entity';
export enum PaymentGatewayType {
  STRIPE = 'stripe',
  CASH_ON_DELIVERY = 'cod',
}

 
export class UserOrders {
   
  street_address: string;
  
  country: string;
 
  city: string;
   
  state: string;
 
  zip: string;
}
 

 

export enum OrdersType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}
 
 
export class Orders extends CoreEntity {
  
  tracking_number: string;
  customer: User;
  total: number;
  shipping_fee: number;
  payment_gateway: PaymentGatewayType;
  products :Products[];
  note : string;
 
  //customer: User;
}
 

