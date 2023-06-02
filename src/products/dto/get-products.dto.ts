import { SortOrder } from '../../common/dto/generic-conditions.dto';
import { PaginationArgs } from '../../common/dto/pagination-args.dto';
import { Paginator } from '../../common/dto/paginator.dto';

import { Products } from '../entities/products.entity';

export class ProductPaginator extends Paginator<Products> {
  data: Products[];
}

export class GetProductsDto extends PaginationArgs {
  orderBy?: QueryProductsOrderByColumn;
  sortedBy?: SortOrder;
  search?: string;
  parent?: number | string = 'null';
  language?: string;
  q?:string;
  price?: number;
  color?: string;
  sort_by?:string;
  category?:string;
  v?:string;
  s?:string;
}

export enum QueryProductsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
