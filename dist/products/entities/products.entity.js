"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const openapi = require("@nestjs/swagger");
const core_entity_1 = require("../../common/entities/core.entity");
class Products extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, slug: { required: true, type: () => String }, isNewArrival: { required: true, type: () => Boolean }, type: { required: true, type: () => String }, image: { required: true, type: () => require("../../common/entities/image.entity").Image }, price: { required: true, type: () => Number }, sale_price: { required: true, type: () => Number }, variations: { required: true, type: () => [require("./variations.entity").Variations] }, categories: { required: true, type: () => [String] } };
    }
}
exports.Products = Products;
//# sourceMappingURL=products.entity.js.map