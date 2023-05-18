import { PickType } from '@nestjs/swagger';
 
import { Products } from '../entities/search.entity';

export class CreateSearchProductsDto extends PickType(Products, [
  'name',
  'description',
  'slug', 
  'isNewArrival',
  'image',
  'price',
  'sale_price',
  'variations',
 
   
]) {}


 




