"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRequestDtoObj = void 0;
const openapi = require("@nestjs/swagger");
class EmailRequestDtoObj {
    static _OPENAPI_METADATA_FACTORY() {
        return { to: { required: false, type: () => String }, from: { required: false, type: () => String }, subject: { required: false, type: () => String }, body: { required: false, type: () => String } };
    }
}
exports.EmailRequestDtoObj = EmailRequestDtoObj;
//# sourceMappingURL=sent-email.dto.js.map