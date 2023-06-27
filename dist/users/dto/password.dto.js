"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddToPasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const password_entity_1 = require("../entities/password.entity");
class CreateAddToPasswordDto extends (0, swagger_1.PickType)(password_entity_1.ADDTOPASSWORD, [
    'id',
    'email',
    'oldpassword',
    'newpassword'
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateAddToPasswordDto = CreateAddToPasswordDto;
//# sourceMappingURL=password.dto.js.map