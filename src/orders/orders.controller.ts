import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly OrdersService: OrdersService) {}

  @Post()
  createOrders(@Body() createOrdersDto: CreateOrdersDto) {
    return this.OrdersService.create(createOrdersDto);
  }

  @Get()
  ordersses() {
    return this.OrdersService.findAll();
  }

  @Get(':id')
  orders(@Param('id') id: string) {
    return this.OrdersService.findOne(+id);
  }

  @Put(':id')
  updateOrders(
    @Param('id') id: string,
    @Body() updateOrdersDto: UpdateOrdersDto,
  ) {
    return this.OrdersService.update(+id, updateOrdersDto);
  }

  @Delete(':id')
  deleteOrders(@Param('id') id: string) {
    return this.OrdersService.remove(+id);
  }
}
