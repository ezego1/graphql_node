"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationSchema = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const authSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(6).required(),
    password: joi_1.default.string().min(6).required()
});
exports.authSchema = authSchema;
const organizationSchema = joi_1.default.object({
    organization: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    marketValue: joi_1.default.string().required(),
    ceo: joi_1.default.string().required(),
    country: joi_1.default.string().required()
});
exports.organizationSchema = organizationSchema;
