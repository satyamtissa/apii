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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
let MongoModule = class MongoModule {
};
MongoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        uri: "mongodb://ecom:ecom@localhost:27017",
                        dbname: "skpearl"
                    });
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            {
                provide: 'DATABASE_CONNECTION',
                useFactory: () => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const client = mongodb_1.MongoClient.connect('mongodb://ecom:ecom@127.0.0.1:27017?authMechanism=SCRAM-SHA-1&authSource=skpearl');
                        return (yield client).db('skpearl');
                    }
                    catch (e) {
                        console.log("EEEEEE=>" + JSON.stringify(e));
                        throw e;
                    }
                })
            },
        ],
        exports: ['DATABASE_CONNECTION'],
    })
], MongoModule);
exports.MongoModule = MongoModule;
//# sourceMappingURL=mongo.module.js.map