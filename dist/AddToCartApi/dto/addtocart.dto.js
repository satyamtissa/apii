"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddToCartDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const addtocart_entities_1 = require("../entities/addtocart.entities");
class CreateAddToCartDto extends (0, swagger_1.PickType)(addtocart_entities_1.ADDTOCART, [
    'data',
    'email',
    'quantity'
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateAddToCartDto = CreateAddToCartDto;
//# sourceMappingURL=addtocart.dto.js.map