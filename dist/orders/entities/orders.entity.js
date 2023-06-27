"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = exports.OrdersType = exports.UserOrders = exports.PaymentGatewayType = void 0;
const openapi = require("@nestjs/swagger");
const core_entity_1 = require("../../common/entities/core.entity");
var PaymentGatewayType;
(function (PaymentGatewayType) {
    PaymentGatewayType["STRIPE"] = "stripe";
    PaymentGatewayType["CASH_ON_DELIVERY"] = "cod";
})(PaymentGatewayType = exports.PaymentGatewayType || (exports.PaymentGatewayType = {}));
class UserOrders {
    static _OPENAPI_METADATA_FACTORY() {
        return { street_address: { required: true, type: () => String }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, state: { required: true, type: () => String }, zip: { required: true, type: () => String } };
    }
}
exports.UserOrders = UserOrders;
var OrdersType;
(function (OrdersType) {
    OrdersType["BILLING"] = "billing";
    OrdersType["SHIPPING"] = "shipping";
})(OrdersType = exports.OrdersType || (exports.OrdersType = {}));
class Orders extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { tracking_number: { required: true, type: () => String }, customer: { required: true, type: () => require("../../users/entities/user.entity").User }, total: { required: true, type: () => Number }, shipping_fee: { required: true, type: () => Number }, payment_gateway: { required: true, enum: require("./orders.entity").PaymentGatewayType }, products: { required: true, type: () => [require("../../products/entities/products.entity").Products] }, note: { required: true, type: () => String } };
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.entity.js.map