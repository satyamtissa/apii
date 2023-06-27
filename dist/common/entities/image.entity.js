"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const openapi = require("@nestjs/swagger");
const core_entity_1 = require("./core.entity");
class Image extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { thumbnail: { required: true, type: () => String }, original: { required: true, type: () => String } };
    }
}
exports.Image = Image;
//# sourceMappingURL=image.entity.js.map