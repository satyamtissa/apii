"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_products_dto_1 = require("./create-products.dto");
class UpdateProductsDto extends (0, swagger_1.PartialType)(create_products_dto_1.CreateProductsDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProductsDto = UpdateProductsDto;
//# sourceMappingURL=update-products.dto.js.map