"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let OrdersService = class OrdersService {
    constructor(db) {
        this.db = db;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //const productsTemp = plainToClass(Product, productsJson);
            // const fuse = new Fuse(productsTemp, options);
            //  this.orders = await this.db.collection('orders').find().toArray();)
        });
    }
    create(createOrdersDto) {
        const ordersse = this.db.collection('orders').insertOne(createOrdersDto);
        return ordersse;
    }
    findAll() {
        return this.db.collection('orders').find({}).toArray();
    }
    findOne(id) {
        return `This action returns a #${id} orders`;
    }
    update(id, updateOrdersDto) {
        this.db.collection('orders').updateOne({ id: `${id}` }, updateOrdersDto);
        return `This action updates a # orders`;
    }
    remove(id) {
        return [];
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map