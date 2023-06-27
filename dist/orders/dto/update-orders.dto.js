"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrdersDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_orders_dto_1 = require("./create-orders.dto");
class UpdateOrdersDto extends (0, swagger_1.PartialType)(create_orders_dto_1.CreateOrdersDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateOrdersDto = UpdateOrdersDto;
//# sourceMappingURL=update-orders.dto.js.map