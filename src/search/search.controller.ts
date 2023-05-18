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
import { SearchProductsService } from './search.service';
import { CreateSearchProductsDto } from './dto/create-search.dto';
import { GetSearchProductsDto } from './dto/get-search.dto';
import { UpdateSearchProductsDto } from './dto/update-search.dto';

@Controller('search')
export class SearchProductsController {
  constructor(private readonly SearchProductsService: SearchProductsService) {}

  @Post()
  create(@Body() createProductsDto: CreateSearchProductsDto) {
    return this.SearchProductsService.create(createProductsDto);
  }

  @Get()
  findAll(@Query() query: GetSearchProductsDto) {
    const { limit, page, search: q } = query;
    return this.SearchProductsService.getSearchProducts({ limit, page, q });
    
  }
  

  @Get(':param')
  findOne(@Param('param') param: string, @Query('language') language: string) {
    return this.SearchProductsService.getProduct(param, language);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateSearchProductsDto,
  ) {
    return this.SearchProductsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.SearchProductsService.remove(+id);
  }
}
