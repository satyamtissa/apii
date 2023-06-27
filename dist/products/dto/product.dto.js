"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
const openapi = require("@nestjs/swagger");
class ProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, slug: { required: true, type: () => String }, isNewArrival: { required: true, type: () => Boolean }, type: { required: true, type: () => String }, image: { required: true, type: () => ({ id: { required: true, type: () => Number }, thumbnail: { required: true, type: () => String }, original: { required: true, type: () => String } }) }, gallery: { required: true } };
    }
}
exports.ProductDto = ProductDto;
//# sourceMappingURL=product.dto.js.map