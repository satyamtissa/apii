"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variations = void 0;
const openapi = require("@nestjs/swagger");
const core_entity_1 = require("../../common/entities/core.entity");
class Variations extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, attribute: { required: true, type: () => require("./attribute.entity").Attribute } };
    }
}
exports.Variations = Variations;
//# sourceMappingURL=variations.entity.js.map