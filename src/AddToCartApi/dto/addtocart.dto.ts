import { PickType } from '@nestjs/swagger';
 

import { ADDTOCART } from '../entities/addtocart.entities';

export class CreateAddToCartDto extends PickType(ADDTOCART, [
  

  'data',
  'email',
  'quantity'
 
   
]) {}
