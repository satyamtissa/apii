"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const openapi = require("@nestjs/swagger");
const core_entity_1 = require("../../common/entities/core.entity");
class Categories extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, productCount: { required: true, type: () => Number }, icon: { required: true, type: () => String }, tags: { required: true, type: () => [String] }, image: { required: true, type: () => require("../../common/entities/image.entity").Image } };
    }
}
exports.Categories = Categories;
//# sourceMappingURL=categories.entity.js.map