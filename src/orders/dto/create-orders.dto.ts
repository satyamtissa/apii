import { PickType } from '@nestjs/swagger';
 
import { Orders } from '../entities/orders.entity';

export class CreateOrdersDto extends PickType(Orders, [
  'tracking_number',
  'order_date',
  'customer',
  'total',
  'payment_gateway',
  'products',
  'shipping_address',
  'note'
  
]) {}


 




