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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const mongodb_1 = require("mongodb");
const options = {
    keys: ['name', 'slug', 'q', 'type'],
    threshold: 0.3,
};
let ProductsService = class ProductsService {
    constructor(db) {
        this.db = db;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.products = yield this.db.collection('products').find().toArray();
            console.log("In service DDBB products=====");
            this.fuse = new fuse_js_1.default(this.products, options);
        });
    }
    create(createproductDto) {
        return this.products[0];
    }
    getProducts({ limit, page, search, parent, q, v, s, price, sort_by, category, color }) {
        console.log("In service get products=====" + JSON.stringify({ limit, page, search, parent, q, v, price, sort_by }));
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = this.products;
        if (search) {
            const searchParams = search.split(';');
            const queryParams = searchParams.map(param => {
                const [key, value] = param.split(':');
                return { key, value };
                console.log("inside search");
            });
            const qParam = queryParams.find(param => param.key === 'q');
            if (qParam) {
                const q = qParam.value.toLowerCase();
                console.log('qParam q', q);
                let [minPrice, maxPrice] = price.toString().split('-').map(p => parseInt(p));
                //data = this.products.find(product => product.slug.toLowerCase() === q);
                // data = this.products.filter(product => (product.slug.toLowerCase() === q) || (product.type.toLowerCase() === q));
                data = this.products.filter(product => (product.sale_price > minPrice) && ((product.slug.toLowerCase() === q) || (product.type.toLowerCase() === q)));
                //data = this.products.filter(product =>( (product.slug.toLowerCase() === q) || (product.type.toLowerCase() === q))&&(( product.price > (minPrice) && product.price < (maxPrice))) );
                console.log("inside qParam");
            }
        }
        if (q) {
            const searchStr = q.toLowerCase();
            //let [minPrice, maxPrice] = price?.toString().split('-').map(p => parseInt(p)) || [];
            let minPrice, maxPrice;
            if (typeof price === 'number') {
                // Case: Single price value
                minPrice = maxPrice = price;
            }
            else if (typeof price === 'string') {
                const priceRanges = decodeURIComponent(price).split(',');
                priceRanges.forEach((range) => {
                    const [start, end] = range.split('-').map(Number);
                    if (!isNaN(start) && !isNaN(end)) {
                        if (minPrice === undefined || start < minPrice) {
                            minPrice = start;
                        }
                        if (maxPrice === undefined || end > maxPrice) {
                            maxPrice = end;
                        }
                    }
                });
            }
            console.log('Min Price:', minPrice);
            console.log('Max Price:', maxPrice);
            if (minPrice && minPrice > 10 && sort_by && color) {
                // Combination: q + price + sort_by + color
                data = this.products.filter(product => (product.sale_price > minPrice && product.sale_price < maxPrice) &&
                    (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
                    product.colour === color).sort((a, b) => {
                    if (sort_by === "low-high") {
                        return a.sale_price - b.sale_price;
                    }
                    else if (sort_by === "high-low") {
                        return b.sale_price - a.sale_price;
                    }
                    // Handle other sort_by values here, if needed
                });
            }
            else if (minPrice && minPrice > 10 && sort_by) {
                // Combination: q + price + sort_by
                data = this.products.filter(product => (product.sale_price > minPrice && product.sale_price < maxPrice) &&
                    (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)).sort((a, b) => {
                    if (sort_by === "low-high") {
                        return a.sale_price - b.sale_price;
                    }
                    else if (sort_by === "high-low") {
                        return b.sale_price - a.sale_price;
                    }
                    // Handle other sort_by values here, if needed
                });
            }
            else if (minPrice && minPrice > 10 && color) {
                // Combination: q + price + color
                data = this.products.filter(product => (product.sale_price > minPrice && product.sale_price < maxPrice) &&
                    (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
                    product.colour === color);
            }
            else if (sort_by && color) {
                // Combination: q + sort_by + color
                data = this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
                    product.colour === color).sort((a, b) => {
                    if (sort_by === "low-high") {
                        return a.sale_price - b.sale_price;
                    }
                    else if (sort_by === "high-low") {
                        return b.sale_price - a.sale_price;
                    }
                    // Handle other sort_by values here, if needed
                });
            }
            else if (minPrice && minPrice > 10) {
                // Combination: q + price
                data = this.products.filter(product => (product.sale_price > minPrice && product.sale_price < maxPrice) &&
                    (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr));
            }
            else if (sort_by) {
                // Combination: q + sort_by
                data = this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)).sort((a, b) => {
                    if (sort_by === "low-high") {
                        return a.sale_price - b.sale_price;
                    }
                    else if (sort_by === "high-low") {
                        return b.sale_price - a.sale_price;
                    }
                    // Handle other sort_by values here, if needed
                });
            }
            else if (color) {
                // Combination: q + color
                data = this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr) &&
                    product.colour === color);
            }
            else {
                // Only q filter
                data = this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr));
            }
        }
        else if (v) {
            console.log("inside v");
            const searchStr1 = v.toLowerCase();
            data = this.products.filter(product => ((product.slug === searchStr1) || (product.type === searchStr1) || (product.flashtype === searchStr1) || (product.newarrivals === searchStr1) || (product.topproducts === searchStr1)));
            //data =this.products.filter(product => (product.slug.toLowerCase() === searchStr || product.type.toLowerCase() === searchStr)).slice(0, 10);
            console.log('pricesearchstr', searchStr1);
            console.log("priceinside q and price");
        }
        else if (s) {
            console.log("inside s");
            const searchStr2 = s.toLowerCase();
            data = this.products.filter((product) => product.name.toLowerCase().includes(searchStr2));
            console.log('pricesearchstr', searchStr2);
            console.log("priceinside q and price");
        }
        const results = data;
        const url = `/search?q=${q}&price=${price}&limit=${limit}`;
        console.log("result", results);
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
    }
    getProduct(param, language) {
        return this.products.find((p) => p.id === Number(param) || p.slug === param);
    }
    update(id, updateProductDto) {
        return this.products[0];
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map