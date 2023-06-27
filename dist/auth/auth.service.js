"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const uuid_1 = require("uuid");
const mongodb_1 = require("mongodb");
const bcrypt = __importStar(require("bcrypt"));
//import { ModuleTokenFactory } from '@nestjs/core/injector/module-token-factory';
//const users = plainToClass(User, usersJson);
const reports_service_1 = require("../reports/reports.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(db, myReportService, jwtService) {
        this.db = db;
        this.myReportService = myReportService;
        this.jwtService = jwtService;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users = yield this.db.collection('users').find().toArray();
        });
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    compareMatch(inPassword, dbPassword) {
        console.log("compareMatch==>", inPassword, dbPassword);
        return bcrypt.compare(inPassword, dbPassword);
    }
    signPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // token to expire in 12 hours
            let token = (0, jsonwebtoken_1.sign)(payload, 'secretKey', { expiresIn: '12h' });
            return token;
        });
    }
    validateUser(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let userfind = yield this.db.collection('users').findOne({ email: username });
            if (userfind) {
                const match = yield this.compareMatch(pass, userfind.password);
                if (match)
                    return userfind;
            }
            return null;
        });
    }
    login1(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = user;
            delete user.password;
            delete user.token;
            return {
                token: this.jwtService.sign(payload),
                permissions: ['customer']
            };
        });
    }
    login(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            common_2.Logger.log("loginInput:" + JSON.stringify(loginInput));
            let userfind = yield this.db.collection('users').findOne({ email: loginInput.email });
            common_2.Logger.log("userfind:" + JSON.stringify(userfind));
            if (userfind) {
                const match = yield this.compareMatch(loginInput.password, userfind.password);
                if (match) {
                    return {
                        token: userfind.token,
                        name: userfind.name,
                        email: userfind.email,
                        id: userfind.id,
                        permissions: ['customer'],
                    };
                }
                //Not match passoword
                else {
                    return { token: '',
                        permissions: [] };
                }
            }
            else {
                return { token: '', permissions: [] };
            }
        });
    }
    getCustomerCount(sequenceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.db.collection('users').findOne({ _id: `${sequenceName}` });
            const countData = count ? Number(count.sequence_value) + 1 : 1;
            const nextsequence = yield this.db.collection('users').updateOne({ _id: `${sequenceName}` }, {
                $set: {
                    sequence_value: `${countData}`
                }
            });
            return countData;
        });
    }
    register(createUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasdata = yield this.hashData(createUserInput.password);
            const customerid = yield this.getCustomerCount('customeridSequence');
            let userid;
            const user = {
                id: customerid,
                is_active: true,
                name: createUserInput.name,
                email: createUserInput.email,
                password: '',
                token: '',
                created_at: new Date(),
                updated_at: new Date(),
            };
            user.token = this.jwtService.sign(user);
            user.password = hasdata;
            yield this.db.collection('users').insertOne(user).then(req => {
                userid = customerid + "";
            }).catch(err => {
                userid = "-1";
                console.log("Error:", err);
            });
            return {
                token: user.token,
                permissions: ['customer'],
            };
        });
    }
    changePassword(changePasswordInput) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(changePasswordInput);
            return {
                success: true,
                message: 'Password change successful',
            };
        });
    }
    forgetPassword(forgetPasswordInput) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(forgetPasswordInput);
            let userfind = yield this.db.collection('users').findOne({ email: forgetPasswordInput.email });
            const tokenStr = yield (0, uuid_1.v4)();
            if (userfind) {
                yield this.db.collection('users').updateOne({ email: `${forgetPasswordInput.email}` }, {
                    $set: {
                        token: `${tokenStr}`,
                        updated_at: new Date()
                    }
                });
                const htmlContent = {
                    to: `${forgetPasswordInput === null || forgetPasswordInput === void 0 ? void 0 : forgetPasswordInput.email}`,
                    from: "sandip@tissatech.com",
                    subject: "Your skpearls.com Password Rest",
                    body: "Token to reset password :  <b> " + tokenStr + "<b>"
                };
                this.myReportService.sendMail(htmlContent);
                return {
                    success: true,
                    message: 'Sent Token successful',
                };
            }
            return {
                success: false,
                message: 'User Not Found ß',
            };
        });
    }
    verifyForgetPasswordToken(verifyForgetPasswordTokenInput) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(verifyForgetPasswordTokenInput);
            let userfind = yield this.db.collection('users').findOne({ email: verifyForgetPasswordTokenInput.email, token: verifyForgetPasswordTokenInput.token });
            if (userfind) {
                return {
                    success: true,
                    message: 'Password change successful',
                };
            }
            return {
                success: false,
                message: 'Invalid Token ',
            };
        });
    }
    resetPassword(resetPasswordInput) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(resetPasswordInput);
            const tokenStr = yield (0, uuid_1.v4)();
            const hashdata = yield this.hashData(resetPasswordInput.password);
            const updateTest = yield this.db.collection('users').updateOne({ email: `${resetPasswordInput.email}`, token: `${resetPasswordInput.token}` }, {
                $set: {
                    password: `${hashdata}`,
                    token: `${tokenStr}`,
                    updated_at: new Date()
                }
            });
            if (updateTest.acknowledged) {
                return {
                    success: true,
                    message: 'Password change successful',
                };
            }
            return {
                success: false,
                message: 'Technical issue Please Connect Parineeta shopee Support ',
            };
        });
    }
    socialLogin(socialLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(socialLoginDto);
            return {
                token: 'jwt token',
                permissions: ['super_admin', 'customer'],
            };
        });
    }
    otpLogin(otpLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(otpLoginDto);
            return {
                token: 'jwt token',
                permissions: ['super_admin', 'customer'],
            };
        });
    }
    verifyOtpCode(verifyOtpInput) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(verifyOtpInput);
            return {
                message: 'success',
                success: true,
            };
        });
    }
    sendOtpCode(otpInput) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(otpInput);
            return {
                message: 'success',
                success: true,
                id: '1',
                provider: 'google',
                phone_number: otpInput.phone_number,
                is_contact_exist: true,
            };
        });
    }
    // async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
    //   const startIndex = (page - 1) * first;
    //   const endIndex = page * first;
    //   let data: User[] = this.users;
    //   if (text?.replace(/%/g, '')) {
    //     data = fuse.search(text)?.map(({ item }) => item);
    //   }
    //   const results = data.slice(startIndex, endIndex);
    //   return {
    //     data: results,
    //     paginatorInfo: paginate(data.length, page, first, results.length),
    //   };
    // }
    // public getUser(getUserArgs: GetUserArgs): User {
    //   return this.users.find((user) => user.id === getUserArgs.id);
    // }
    // @Param('id') id: string
    getUserById(custid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("find ther User ID ===>", custid);
            const user = yield this.db.collection('users').findOne({ id: Number(custid) });
            console.log("find ther User obhect ===>", user);
            return user;
        });
    }
    me() {
        return this.users[0];
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db, reports_service_1.ReportsService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map