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

  getProducts({ limit, page, search, parent, q,v,s, price ,sort_by,category,color}: GetProductsDto) {
    console.log("In service get products=====" + JSON.stringify({ limit, page, search, parent, q,v, price, sort_by }))
  
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
    } 


    
      if (q) {
        const searchStr = q.toLowerCase();
       
        //let [minPrice, maxPrice] = price?.toString().split('-').map(p => parseInt(p)) || [];
       

        let minPrice: number | undefined, maxPrice: number | undefined;

        if (typeof price === 'number') {
          // Case: Single price value
          minPrice = maxPrice = price;
        } else if (typeof price === 'string') {
          const priceRanges = decodeURIComponent(price).split(',');
        
          priceRanges.forEach((range) => {
            const [start, end] = range.split('-').map(Number);
        
            if (!isNaN(start) && !isNaN(end)) {
              if (minPrice === undefined || start < minPrice) {
                minPrice = start;
              }
        
              if (maxPrice === undefined || end > maxPrice) {
                maxPrice = end;
              }
            }
          });
        }
        console.log('Min Price:', minPrice);
console.log('Max Price:', maxPrice);

        
        if (minPrice && minPrice > 10 && sort_by && color) {
        // Combination: q + price + sort_by + color
        data = this.products.filter(product =>
          (product.sale_price > minPrice && product.sale_price < maxPrice) &&
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
          product.colour === color
        ).sort((a, b) => {
          if (sort_by === "low-high") {
            return a.sale_price - b.sale_price;
          } else if (sort_by === "high-low") {
            return b.sale_price - a.sale_price;
          }
          // Handle other sort_by values here, if needed
        });
      } else if (minPrice && minPrice > 10 && sort_by) {
        // Combination: q + price + sort_by
        data = this.products.filter(product =>
          (product.sale_price > minPrice && product.sale_price < maxPrice) &&
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)
        ).sort((a, b) => {
          if (sort_by === "low-high") {
            return a.sale_price - b.sale_price;
          } else if (sort_by === "high-low") {
            return b.sale_price - a.sale_price;
          }
          // Handle other sort_by values here, if needed
        });
      } else if (minPrice && minPrice > 10 && color) {
        // Combination: q + price + color
        data = this.products.filter(product =>
          (product.sale_price > minPrice && product.sale_price < maxPrice) &&
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
          product.colour === color
        );
      } else if (sort_by && color) {
        // Combination: q + sort_by + color
        data = this.products.filter(product =>
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
          product.colour === color
        ).sort((a, b) => {
          if (sort_by === "low-high") {
            return a.sale_price - b.sale_price;
          } else if (sort_by === "high-low") {
            return b.sale_price - a.sale_price;
          }
          // Handle other sort_by values here, if needed
        });
      } else if (minPrice && minPrice > 10) {
        // Combination: q + price
        data = this.products.filter(product =>
          (product.sale_price > minPrice && product.sale_price < maxPrice) &&
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)
        );
      } else if (sort_by) {
        // Combination: q + sort_by
        data = this.products.filter(product =>
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)
        ).sort((a, b) => {
          if (sort_by === "low-high") {
            return a.sale_price - b.sale_price;
          } else if (sort_by === "high-low") {
            return b.sale_price - a.sale_price;
          }
          // Handle other sort_by values here, if needed
        });
      } else if (color) {
        // Combination: q + color
        data = this.products.filter(product =>
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
          product.colour === color
        );
      } else {
        // Only q filter
        data = this.products.filter(product =>
          (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)
        );
      }
    }
    
    


    else if (v) {

     console.log("inside v")
      const searchStr1 = v.toLowerCase();
      
    
      
      
      data = this.products.filter(product => ((product.slug === searchStr1)||(product.type === searchStr1)||(product.flashtype === searchStr1)||(product.newarrivals === searchStr1)||(product.topproducts === searchStr1)));
     //data =this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)).slice(0, 10);
    
      console.log('pricesearchstr', searchStr1)
      console.log("priceinside q and price")
      
   
  }
 

  else if (s) {
    console.log("inside s");
    const searchStr2 = s.toLowerCase();
    data = this.products.filter(
      (product) =>
       
        product.name.toLowerCase().includes(searchStr2)
    );
    console.log('pricesearchstr', searchStr2);
    console.log("priceinside q and price");
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
