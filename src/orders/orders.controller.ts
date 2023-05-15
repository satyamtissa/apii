import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';


@Controller('order.json')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrdersDto: CreateOrdersDto) {
    return this.ordersService.create(createOrdersDto);
  }

  @Get()
  findAll(@Query() query: GetOrdersDto) {

    return this.ordersService.getOrders(query);
  }

  @Get(':param')
  findOne(@Param('param') param: string, @Query('language') language: string) {
    return this.ordersService.getOrder(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrdersDto: UpdateOrdersDto,
  ) {
    return this.ordersService.update(+id, updateOrdersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
