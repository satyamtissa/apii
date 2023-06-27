"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProductsOrderByColumn = exports.GetProductsDto = exports.ProductPaginator = void 0;
const openapi = require("@nestjs/swagger");
const pagination_args_dto_1 = require("../../common/dto/pagination-args.dto");
const paginator_dto_1 = require("../../common/dto/paginator.dto");
class ProductPaginator extends paginator_dto_1.Paginator {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../entities/products.entity").Products] } };
    }
}
exports.ProductPaginator = ProductPaginator;
class GetProductsDto extends pagination_args_dto_1.PaginationArgs {
    constructor() {
        super(...arguments);
        this.parent = 'null';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { orderBy: { required: false, enum: require("./get-products.dto").QueryProductsOrderByColumn }, sortedBy: { required: false, enum: require("../../common/dto/generic-conditions.dto").SortOrder }, search: { required: false, type: () => String }, parent: { required: false, type: () => Object, default: 'null' }, language: { required: false, type: () => String }, q: { required: false, type: () => String }, price: { required: false, type: () => Number }, color: { required: false, type: () => String }, sort_by: { required: false, type: () => String }, category: { required: false, type: () => String }, v: { required: false, type: () => String }, s: { required: false, type: () => String }, sortBy: { required: false, type: () => String } };
    }
}
exports.GetProductsDto = GetProductsDto;
var QueryProductsOrderByColumn;
(function (QueryProductsOrderByColumn) {
    QueryProductsOrderByColumn["CREATED_AT"] = "CREATED_AT";
    QueryProductsOrderByColumn["NAME"] = "NAME";
    QueryProductsOrderByColumn["UPDATED_AT"] = "UPDATED_AT";
})(QueryProductsOrderByColumn = exports.QueryProductsOrderByColumn || (exports.QueryProductsOrderByColumn = {}));
//# sourceMappingURL=get-products.dto.js.map