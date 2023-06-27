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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const fuse_js_1 = __importDefault(require("fuse.js"));
//import categoriesJson from '@db/categories.json';
const paginate_1 = require("../common/pagination/paginate");
const mongodb_1 = require("mongodb");
//const categories = plainToClass(Category, categoriesJson);
const options = {
    keys: ['name', 'slug'],
    threshold: 0.3,
};
//const fuse = new Fuse(categories, options);
let CategoriesService = class CategoriesService {
    constructor(db) {
        this.db = db;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //const productsTemp = plainToClass(Product, productsJson);
            // const fuse = new Fuse(productsTemp, options);
            this.categories = yield this.db.collection('categories').find().toArray();
            this.fuse = new fuse_js_1.default(this.categories, options);
            //console.log("Database===>"+JSON.stringify(this.categories ));
        });
    }
    create(createCategoryDto) {
        return this.categories[0];
    }
    getCategories({ limit, page, search, parent }) {
        var _a;
        this.init();
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = this.categories;
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                // data = data.filter((item) => item[key] === value);
                data = (_a = this.fuse.search(value)) === null || _a === void 0 ? void 0 : _a.map(({ item }) => item);
            }
        }
        // if (text?.replace(/%/g, '')) {
        //   data = fuse.search(text)?.map(({ item }) => item);
        // }
        // if (hasType) {
        //   data = fuse.search(hasType)?.map(({ item }) => item);
        // }
        const results = data.slice(startIndex, endIndex);
        const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
    }
    getCategory(param, language) {
        return this.categories.find((p) => p.id === Number(param) || p.slug === param);
    }
    update(id, updateCategoryDto) {
        return this.categories[0];
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map