"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_1 = __importDefault(require("./organization"));
const auth_1 = __importDefault(require("./auth"));
const graphResolver = {
    ...organization_1.default,
    ...auth_1.default
};
exports.default = graphResolver;
