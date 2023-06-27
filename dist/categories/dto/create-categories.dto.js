"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoriesDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const categories_entity_1 = require("../entities/categories.entity");
class CreateCategoriesDto extends (0, swagger_1.PickType)(categories_entity_1.Categories, [
    'name',
    'slug',
    'productCount',
    'icon',
    'tags',
    'image',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateCategoriesDto = CreateCategoriesDto;
//# sourceMappingURL=create-categories.dto.js.map