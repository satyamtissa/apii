import { PartialType } from '@nestjs/swagger';
import {CreateSearchProductsDto } from './create-search.dto';

export class UpdateSearchProductsDto extends PartialType(CreateSearchProductsDto) {}
