import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Orders } from '../entities/orders.entity';

export class ProductPaginator extends Paginator<Orders> {
  data: Orders[];
}

export class GetOrdersDto extends PaginationArgs {
  orderBy?: QueryOrdersOrderByColumn;
  sortedBy?: SortOrder;
  search?: string;
  parent?: number | string = 'null';
  language?: string;
}

export enum QueryOrdersOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
