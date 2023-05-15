import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { Orders } from './entities/orders.entity';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Db, ObjectID } from 'mongodb';

const options = {
  keys: ['name', 'slug', 'price'],
  threshold: 0.3,
};

@Injectable()
export class OrdersService {
  private orders: any;
  private fuse: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.init();


  }

  async init() {

    this.orders = await this.db.collection('orders').find().toArray();
    console.log("In service DDBB products=====")
    this.fuse = new Fuse(this.orders, options);

  }
  async create(createorderDto: CreateOrdersDto) {
    const order = await this.db.collection('orders').insertOne(createorderDto);
    return order;
  }

  getOrders({ limit, page, search, parent }: GetOrdersDto) {
    console.log("In service get Orders=====" + JSON.stringify({ limit, page, search, parent }))
    this.init();
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Orders[] = this.orders;
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');

        data = this.fuse.search(value)?.map(({ item }) => item);
      }
    }

    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/orders?search=${search}&limit=${limit}&parent=${parent}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrder(param: string, language: string): Orders {
    return this.orders.find(
      (p) => p.id === Number(param) || p.slug === param,
    );
  }

  update(id: number, updateOrderDto: UpdateOrdersDto) {
    return this.orders[0];
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
