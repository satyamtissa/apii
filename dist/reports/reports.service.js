"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let ReportsService = class ReportsService {
    sendMail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = {
                    personalizations: [{
                            to: [{ email: `${input.to}` }]
                        }],
                    from: { email: `${input.from}` },
                    subject: `${input.subject}`,
                    content: [{
                            type: 'text/html',
                            value: `${input.body}`
                        }]
                };
                const headerBody = {
                    headers: {
                        'Authorization': 'Bearer ' + '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',
                    }
                };
                const emailRes = yield axios_1.default.post('https://api.sendgrid.com/v3/mail/send', requestBody, headerBody);
                return {
                    httpCode: 200
                };
            }
            catch (err) {
                return {
                    httpCode: 400
                };
                console.log(`Error sending email to sandip.chaudhari22@gmail.com`, err);
            }
        });
    }
};
ReportsService = __decorate([
    (0, common_1.Injectable)()
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map