import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Products } from './entities/products.entity';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Db, ObjectID } from 'mongodb';

const options = {
  keys: ['name', 'slug','price'],
  threshold: 0.3,
};

@Injectable()
export class ProductsService {
  private products: any ;
  private fuse: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.init();
    

  }

  async init() {
  
    this.products = await this.db.collection('products').find().toArray();
    console.log("In service DDBB products=====")
    this.fuse=new Fuse(this.products, options);
    
}
  create(createproductDto: CreateProductsDto) {
    return this.products[0];
  }

  getProducts({ limit, page, search, parent }: GetProductsDto) {
    console.log("In service get products====="+ JSON.stringify({ limit, page, search, parent }))
    this.init();
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Products[] = this.products;
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
       
        data = this.fuse.search(value)?.map(({ item }) => item);
      }
    }

    //satyam
    
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}&parent=${parent}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getProduct(param: string, language: string): Products {
    return this.products.find( 
      (p) => p.id === Number(param) || p.slug === param,
    );
  }

  update(id: number, updateProductDto: UpdateProductsDto) {
    return this.products[0];
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
