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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const fuse_js_1 = __importDefault(require("fuse.js"));
const bcrypt = __importStar(require("bcrypt"));
//import usersJson from '@db/users.json';
const paginate_1 = require("../common/pagination/paginate");
const mongodb_1 = require("mongodb");
//const users = plainToClass(User, usersJson);
const options = {
    keys: ['name', 'type.slug', 'categories.slug', 'status'],
    threshold: 0.3,
};
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users = yield this.db.collection('users').find().toArray();
            this.fuse = new fuse_js_1.default(this.users, options);
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.collection('users').insertOne(createUserDto);
            return user;
        });
    }
    getUsers({ text, limit, page, search, }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!page)
                page = 1;
            if (!limit)
                limit = 30;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            this.users = yield this.db.collection('users').find().toArray();
            let data = this.users;
            if (text === null || text === void 0 ? void 0 : text.replace(/%/g, '')) {
                data = (_a = this.fuse.search(text)) === null || _a === void 0 ? void 0 : _a.map(({ item }) => item);
            }
            if (search) {
                const parseSearchParams = search.split(';');
                const searchText = [];
                for (const searchParam of parseSearchParams) {
                    const [key, value] = searchParam.split(':');
                    // TODO: Temp Solution
                    if (key !== 'slug') {
                        searchText.push({
                            [key]: value,
                        });
                    }
                }
                data = (_b = this.fuse
                    .search({
                    $and: searchText,
                })) === null || _b === void 0 ? void 0 : _b.map(({ item }) => item);
            }
            const results = data.slice(startIndex, endIndex);
            const url = `/users?limit=${limit}`;
            return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.db.collection('users').findOne({ id: id });
            return userData;
            //this.users.find((user) => user.id === id);
        });
    }
    addToPassword(addToPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, oldpassword, newpassword } = addToPasswordDto;
            try {
                const user = yield this.db.collection('users').findOne({ id, email });
                if (user) {
                    const passwordMatches = yield bcrypt.compare(oldpassword, user.password);
                    if (!passwordMatches) {
                        return 'Old password is incorrect';
                    }
                    const hashedNewPassword = yield bcrypt.hash(newpassword, 10); // Hash the new password
                    // Update the password
                    yield this.db.collection('users').updateOne({ id, email }, { $set: { password: hashedNewPassword } });
                    return 'Password updated successfully';
                }
                else {
                    return 'User not found';
                }
            }
            catch (error) {
                console.error(error);
                this.init();
                return 'Failed to update password';
            }
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.collection('users').updateOne({ id: id }, {
                $set: Object.assign({}, updateUserDto)
            });
            if (user.acknowledged)
                return updateUserDto;
            return user;
        });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    makeAdmin(user_id) {
        return this.users.find((u) => u.id === Number(user_id));
    }
    banUser(id) {
        const user = this.users.find((u) => u.id === Number(id));
        user.is_active = !user.is_active;
        return user;
    }
    activeUser(id) {
        const user = this.users.find((u) => u.id === Number(id));
        user.is_active = !user.is_active;
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map