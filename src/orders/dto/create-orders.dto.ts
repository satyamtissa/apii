import { PickType } from '@nestjs/swagger';
import { Orders } from '../entities/orders.entity';

export class CreateOrdersDto extends PickType(Orders, [
  'tracking_number',
  'customer',
  'total',
  'shipping_fee',
  'payment_gateway',
  'products' ,
  'note', 
]) {
  'customer_id': number;
}
