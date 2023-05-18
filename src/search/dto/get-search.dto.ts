  import { SortOrder } from '../../common/dto/generic-conditions.dto';
  import { PaginationArgs } from '../../common/dto/pagination-args.dto';
  import { Paginator } from '../../common/dto/paginator.dto';

  import { Products } from '../entities/search.entity';

  export class SearchPaginator extends Paginator<Products> {
    data: Products[];
  }

  export class GetSearchProductsDto extends PaginationArgs {
    orderBy?: QueryProductsOrderByColumn;
    sortedBy?: SortOrder;
    search?: string;
    parent?: number | string = 'null';
    language?: string;
    q?: string;
  }

  export enum QueryProductsOrderByColumn {
    CREATED_AT = 'CREATED_AT',
    NAME = 'NAME',
    UPDATED_AT = 'UPDATED_AT',
  }
