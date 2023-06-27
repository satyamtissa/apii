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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartService = void 0;
const common_1 = require("@nestjs/common");
const fuse_js_1 = __importDefault(require("fuse.js"));
const mongodb_1 = require("mongodb");
const options = {
    keys: ['name', 'slug'],
    threshold: 0.3,
};
let AddToCartService = class AddToCartService {
    constructor(db) {
        this.db = db;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cart = yield this.db.collection('cart').find().toArray();
            console.log("In service DDBB products=====");
            this.fuse = new fuse_js_1.default(this.cart, options);
        });
    }
    getCartProduct(param, language) {
        return this.cart;
    }
    addToCart(addToCartDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, email, quantity } = addToCartDto;
            const cartItem = {
                data,
                email,
                quantity,
            };
            try {
                yield this.db.collection('cart').insertOne(cartItem);
                return 'Cart item added successfully';
            }
            catch (error) {
                console.error(error);
                this.init();
                return 'Failed to add item to cart';
            }
        });
    }
    getAllCartItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItems = yield this.db.collection('cart').find().toArray();
            return cartItems.map((item) => ({
                data: item.data,
                email: item.email,
                quantity: item.quantity,
            }));
        });
    }
};
AddToCartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db])
], AddToCartService);
exports.AddToCartService = AddToCartService;
//# sourceMappingURL=AddToCart.service.js.map