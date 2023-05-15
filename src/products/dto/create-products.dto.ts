import { PickType } from '@nestjs/swagger';
 
import { Products } from '../entities/products.entity';

export class CreateProductsDto extends PickType(Products, [
  'name',
  'description',
  'slug', 
  'isNewArrival',
  'image',
  'price',
  'sale_price',
  'variations',
 
   
]) {}


 




