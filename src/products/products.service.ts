import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Products } from './entities/products.entity';
import Fuse from 'fuse.js';
import { paginate } from '../common/pagination/paginate';
import { Db, ObjectID } from 'mongodb';

const options = {
  keys: ['name', 'slug','q','type'],
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

  getProducts({ limit, page, search, parent, q, price ,sort_by,category}: GetProductsDto) {
    console.log("In service get products=====" + JSON.stringify({ limit, page, search, parent, q, price }))
  
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Products[] = this.products;
  
    if (search) {
      const searchParams = search.split(';');
      const queryParams = searchParams.map(param => {
        const [key, value] = param.split(':');
        return { key, value };
        console.log("inside search")
      });
  
      const qParam = queryParams.find(param => param.key === 'q');
     

      if (qParam) {
        const q = qParam.value.toLowerCase();
        console.log('qParam q',q)
        let [minPrice, maxPrice] = price.toString().split('-').map(p => parseInt(p));
        //data = this.products.find(product => product.slug.toLowerCase() === q);
       // data = this.products.filter(product => (product.slug.toLowerCase() === q) || (product.type.toLowerCase() === q));
       data = this.products.filter(product => (product.sale_price>minPrice) && ( (product.slug.toLowerCase() === q)||(product.type.toLowerCase() === q)));

       //data = this.products.filter(product =>( (product.slug.toLowerCase() === q) || (product.type.toLowerCase() === q))&&(( product.price > (minPrice) && product.price < (maxPrice))) );

        console.log("inside qParam")
      }
    } else if (q) {

     
        const searchStr = q.toLowerCase();
        let [minPrice, maxPrice] = price.toString().split('-').map(p => parseInt(p));
        console.log(minPrice)
        console.log(maxPrice)
        console.log(typeof(minPrice))
        console.log(sort_by)  
        if(minPrice>10)
        {
          data = this.products.filter(product => (product.sale_price>minPrice && product.sale_price<maxPrice) && ((product.slug.toLowerCase() === searchStr)||(product.type.toLowerCase() === searchStr)));

        }
        else if(category)
        {
          console.log("in category")
          console.log("categoryvalue",category)
          data = this.products.filter(product => ((product.slug.toLowerCase() === category)||(product.type.toLowerCase() === category)));

        }
      
        else
        {
        data = this.products.filter(product => ((product.slug.toLowerCase() === searchStr)||(product.type.toLowerCase() === searchStr)));
       //data =this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)).slice(0, 10);
      }
        console.log('pricesearchstr', searchStr)
        console.log("priceinside q and price")
        console.log("category is ",category)
    
     
    }
   
  
    const results = data
  
    const url = `/search?q=${q}&price=${price}&limit=${limit}`;
    console.log("result", results)
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


  /*getProductBySlug(slug: string) {
    console.log("testing the data")
    return this.db.collection('products').findOne({ slug });

  }*/

  


}
