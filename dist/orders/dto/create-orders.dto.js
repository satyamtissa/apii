"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrdersDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const orders_entity_1 = require("../entities/orders.entity");
class CreateOrdersDto extends (0, swagger_1.PickType)(orders_entity_1.Orders, [
    'tracking_number',
    'customer',
    'total',
    'shipping_fee',
    'payment_gateway',
    'products',
    'note',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { 'customer_id': { required: true, type: () => Number } };
    }
}
exports.CreateOrdersDto = CreateOrdersDto;
//# sourceMappingURL=create-orders.dto.js.map