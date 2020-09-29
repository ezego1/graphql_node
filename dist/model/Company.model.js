"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const product = new Schema({
    name: {
        type: String,
        required: true,
    },
});
const employee = new Schema({
    name: {
        type: String,
        required: true,
    },
});
const companySchema = new Schema({
    organization: {
        type: String,
        trim: true,
        unique: true
    },
    products: [product],
    address: {
        type: String,
        required: true
    },
    marketValue: {
        type: String,
        required: true
    },
    ceo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    employees: [employee],
}, { timestamps: true });
const Company = mongoose_1.default.model('Company', companySchema);
exports.default = Company;
