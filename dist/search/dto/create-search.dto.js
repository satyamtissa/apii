"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSearchProductsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const search_entity_1 = require("../entities/search.entity");
class CreateSearchProductsDto extends (0, swagger_1.PickType)(search_entity_1.Products, [
    'name',
    'description',
    'slug',
    'isNewArrival',
    'image',
    'price',
    'sale_price',
    'variations',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateSearchProductsDto = CreateSearchProductsDto;
//# sourceMappingURL=create-search.dto.js.map