"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDTOPASSWORD = void 0;
const openapi = require("@nestjs/swagger");
class ADDTOPASSWORD {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, oldpassword: { required: true, type: () => String }, newpassword: { required: true, type: () => Number } };
    }
}
exports.ADDTOPASSWORD = ADDTOPASSWORD;
//# sourceMappingURL=password.entity.js.map