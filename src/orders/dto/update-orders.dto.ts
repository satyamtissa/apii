import { PartialType } from '@nestjs/swagger';
import {CreateOrdersDto } from './create-orders.dto';

export class UpdateOrdersDto extends PartialType(CreateOrdersDto) {}
