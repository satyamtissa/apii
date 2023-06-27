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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const create_search_dto_1 = require("./dto/create-search.dto");
const get_search_dto_1 = require("./dto/get-search.dto");
const update_search_dto_1 = require("./dto/update-search.dto");
let SearchProductsController = class SearchProductsController {
    constructor(SearchProductsService) {
        this.SearchProductsService = SearchProductsService;
    }
    create(createProductsDto) {
        return this.SearchProductsService.create(createProductsDto);
    }
    findAll(query) {
        const { limit, page, search: q } = query;
        return this.SearchProductsService.getSearchProducts({ limit, page, q });
    }
    findOne(param, language) {
        return this.SearchProductsService.getProduct(param, language);
    }
    update(id, updateProductDto) {
        return this.SearchProductsService.update(+id, updateProductDto);
    }
    remove(id) {
        return this.SearchProductsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_search_dto_1.CreateSearchProductsDto]),
    __metadata("design:returntype", void 0)
], SearchProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_search_dto_1.GetSearchProductsDto]),
    __metadata("design:returntype", void 0)
], SearchProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':param'),
    __param(0, (0, common_1.Param)('param')),
    __param(1, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SearchProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_search_dto_1.UpdateSearchProductsDto]),
    __metadata("design:returntype", void 0)
], SearchProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SearchProductsController.prototype, "remove", null);
SearchProductsController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchProductsService])
], SearchProductsController);
exports.SearchProductsController = SearchProductsController;
//# sourceMappingURL=search.controller.js.map