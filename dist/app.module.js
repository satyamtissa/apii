"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const common_module_1 = require("./common/common.module");
const categories_module_1 = require("./categories/categories.module");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const addresses_module_1 = require("./addresses/addresses.module");
const products_module_1 = require("./products/products.module");
const reports_module_1 = require("./reports/reports.module");
const search_module_1 = require("./search/search.module");
const AddToCart_module_1 = require("./AddToCartApi/AddToCart.module");
const orders_module_1 = require("./orders/orders.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/skpearl', {
                connectionName: 'skpearl',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            common_module_1.CommonModule,
            categories_module_1.CategoriesModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            addresses_module_1.AddressesModule,
            products_module_1.ProductsModule,
            reports_module_1.ReportsModule,
            search_module_1.SearchProductsModule,
            AddToCart_module_1.AddToCartModule,
            orders_module_1.OrdersModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map