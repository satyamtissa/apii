import { CoreEntity } from "src/common/entities/core.entity"


export class Orders extends CoreEntity {
  tracking_number: string;
  order_date:string;
  customer: customerType;
  total: number;
  payment_gateway: string;
  products: Item[];
  shipping_address: CheckoutInputType;
  note: string;
}


export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  [key: string]: any;
}



export interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}





export interface customerType {
  id: number;
  email: string;
  name: string;
}


