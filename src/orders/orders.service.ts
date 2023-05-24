import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Injectable()
export class OrdersService {

  constructor( 
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) 
  {

    this.init();
    
  }

  async init() {
    //const productsTemp = plainToClass(Product, productsJson);
   // const fuse = new Fuse(productsTemp, options);
  //  this.orders = await this.db.collection('orders').find().toArray();)

  }
  create(createOrdersDto: CreateOrdersDto) {

    const ordersse=this.db.collection('orders').insertOne(createOrdersDto);
    return ordersse;
  }

  

  findAll() {
    return this.db.collection('orders').find({}).toArray();
  }

  findOne(id: number) {
    return `This action returns a #${id} orders`;
  }

  update(id: number, updateOrdersDto: UpdateOrdersDto) {
    
    this.db.collection('orders').updateOne({ id: `${id}`},updateOrdersDto)
    return `This action updates a # orders`;
  }

  remove(id: number) {
    return [];
  }
}
