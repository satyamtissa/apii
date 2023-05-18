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
  
import { AddToCartService } from './AddToCart.service';
import { CreateAddToCartDto } from './dto/addtocart.dto';
import { ADDTOCART } from './entities/addtocart.entities';


  @Controller('cart')
  export class AddToCartController {
    constructor(private readonly AddToCartService: AddToCartService) {}



    @Post()
  async addToCart(@Body() addToCartDto: CreateAddToCartDto): Promise<string> {
    return this.AddToCartService.addToCart(addToCartDto);
  }

  @Get()
  async getAllCartItems(): Promise<ADDTOCART[]> {
    return this.AddToCartService.getAllCartItems();
  }

  
}
  