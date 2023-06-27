"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationArgs = void 0;
const openapi = require("@nestjs/swagger");
class PaginationArgs {
    constructor() {
        // FIX ME
        this.first = 15;
        this.limit = 3;
        this.page = 1;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { first: { required: false, type: () => Number, default: 15 }, limit: { required: false, type: () => Number, default: 3 }, page: { required: false, type: () => Number, default: 1 } };
    }
}
exports.PaginationArgs = PaginationArgs;
//# sourceMappingURL=pagination-args.dto.js.map