import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateSearchProductsDto } from './dto/create-search.dto';
import { GetSearchProductsDto } from './dto/get-search.dto';
import { UpdateSearchProductsDto } from './dto/update-search.dto';
import { Products } from './entities/search.entity';
import Fuse from 'fuse.js';
import { paginate } from '../common/pagination/paginate';
import { Db, ObjectID } from 'mongodb';

const options = {
  keys: ['name', 'slug'],
  threshold: 0.3,
};

@Injectable()
export class SearchProductsService {
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
  create(createproductDto: CreateSearchProductsDto) {
    return this.products[0];
  }

 


  getSearchProducts({ limit, page, q }: { limit: number; page: number; q: string }) {
    console.log("In service get products====="+ JSON.stringify({ limit, page, q }))
    this.init();
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Products[] = this.products;
    if (q) {
      const searchStr = q.toLowerCase();
      data = this.products.filter(product => product.slug.toLowerCase() === searchStr);
    }
    
    const results = data.slice(startIndex, endIndex);
    
    const url = `/search1?q=Stunning Butterfly Pearl Necklace&limit=${limit}`;
  
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

  update(id: number, updateProductDto: UpdateSearchProductsDto) {
    return this.products[0];
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async searchProductsBySlug(slug: string) {
    console.log("Searching for products")
    const collection = this.db.collection('products');
    const query = { slug: slug };
    const options = { projection: { _id: 0 } };
    const products = await collection.find(query, options).toArray();
    return products;
  }
}
