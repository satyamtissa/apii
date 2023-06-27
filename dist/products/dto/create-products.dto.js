"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const products_entity_1 = require("../entities/products.entity");
class CreateProductsDto extends (0, swagger_1.PickType)(products_entity_1.Products, [
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
exports.CreateProductsDto = CreateProductsDto;
//# sourceMappingURL=create-products.dto.js.map