"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProductsOrderByColumn = exports.GetSearchProductsDto = exports.SearchPaginator = void 0;
const openapi = require("@nestjs/swagger");
const pagination_args_dto_1 = require("../../common/dto/pagination-args.dto");
const paginator_dto_1 = require("../../common/dto/paginator.dto");
class SearchPaginator extends paginator_dto_1.Paginator {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../entities/search.entity").Products] } };
    }
}
exports.SearchPaginator = SearchPaginator;
class GetSearchProductsDto extends pagination_args_dto_1.PaginationArgs {
    constructor() {
        super(...arguments);
        this.parent = 'null';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { orderBy: { required: false, enum: require("./get-search.dto").QueryProductsOrderByColumn }, sortedBy: { required: false, enum: require("../../common/dto/generic-conditions.dto").SortOrder }, search: { required: false, type: () => String }, parent: { required: false, type: () => Object, default: 'null' }, language: { required: false, type: () => String }, q: { required: false, type: () => String } };
    }
}
exports.GetSearchProductsDto = GetSearchProductsDto;
var QueryProductsOrderByColumn;
(function (QueryProductsOrderByColumn) {
    QueryProductsOrderByColumn["CREATED_AT"] = "CREATED_AT";
    QueryProductsOrderByColumn["NAME"] = "NAME";
    QueryProductsOrderByColumn["UPDATED_AT"] = "UPDATED_AT";
})(QueryProductsOrderByColumn = exports.QueryProductsOrderByColumn || (exports.QueryProductsOrderByColumn = {}));
//# sourceMappingURL=get-search.dto.js.map