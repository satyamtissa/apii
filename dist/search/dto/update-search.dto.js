"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSearchProductsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_search_dto_1 = require("./create-search.dto");
class UpdateSearchProductsDto extends (0, swagger_1.PartialType)(create_search_dto_1.CreateSearchProductsDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSearchProductsDto = UpdateSearchProductsDto;
//# sourceMappingURL=update-search.dto.js.map