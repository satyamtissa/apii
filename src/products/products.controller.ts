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
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Products } from './entities/products.entity';
import { ProductDto } from './dto/product.dto';

@Controller('search')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  findAll(@Query() query: GetProductsDto) {

    return this.productsService.getProducts(query);
  }


  @Get(':param')
  findOne(@Param('param') param: string, @Query('language') language: string) {
    return this.productsService.getProduct(param, language);
  }
  


  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductsDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Get()
getProducts(@Query() query: GetProductsDto) {
  const { limit, page, q, parent } = query;
  const search = q ? `q:${q}` : undefined;
  return this.productsService.getProducts({ limit, page, search, parent, q });
}
  



  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }



  /*@Get()
  async getProductBySlug(@Query('q') slug: string): Promise<ProductDto> {
    const product = await this.productsService.getProductBySlug(slug);

    if (!product) {
      throw new Error('Product not found');
    }
    console.log

    const productDto: ProductDto = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      isNewArrival: product.isNewArrival,
      type: product.type,
      image: product.image,
      gallery: product.gallery,
    };

    return productDto;
  }*/
}














  

