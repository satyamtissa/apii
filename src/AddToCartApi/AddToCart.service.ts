import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { ADDTOCART } from './entities/addtocart.entities';
import { CreateAddToCartDto } from './dto/addtocart.dto';
import Fuse from 'fuse.js';

import { paginate } from '../common/pagination/paginate';
import { Db, ObjectID } from 'mongodb';

const options = {
  keys: ['name', 'slug'],
  threshold: 0.3,
};

@Injectable()
export class AddToCartService {
  private cart: any;
  private fuse: any;
  
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.init();
  }

  async init() {
    this.cart = await this.db.collection('cart').find().toArray();
    console.log("In service DDBB products=====");
    this.fuse = new Fuse(this.cart, options);
  }

  getCartProduct(param: string, language: string): ADDTOCART {
    return this.cart;
  }

  async addToCart(addToCartDto: CreateAddToCartDto): Promise<string> {
    const { data, email, quantity } = addToCartDto;
  
    const cartItem: ADDTOCART = {
      data,
      email,
      quantity,
    };
  
    try {
      await this.db.collection('cart').insertOne(cartItem);
      return 'Cart item added successfully';
    } catch (error) {
      console.error(error);
      this.init();
      return 'Failed to add item to cart';
    }
  }

  



  public async getAllCartItems(): Promise<ADDTOCART[]> {
    const cartItems = await this.db.collection('cart').find().toArray();
    return cartItems.map((item) => ({
      data: item.data,
      email: item.email,
      quantity: item.quantity,
    }));
  }
  
    

}