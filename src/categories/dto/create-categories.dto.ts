import { PickType } from '@nestjs/swagger';
 
import { Categories } from '../entities/categories.entity';

export class CreateCategoriesDto extends PickType(Categories, [
  'name',
  'slug',
  'productCount', 
  'icon',
  'tags',
  'image',
   
]) {}


 