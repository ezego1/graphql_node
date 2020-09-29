"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    url: process.env.APP_URL || "http://localhost:8080",
    port: process.env.PORT || 8080,
    environment: process.env.NODE_ENV || "development",
    databaseUrl: {
        production: process.env.PRODUCTION_DATABASE_URL ||
            "mongodb+srv://node-stack-dev:decagon-node@cluster0.umwvb.mongodb.net/graphProduction",
        development: process.env.DEVELOPMENT_DATABASE_URL ||
            "mongodb+srv://node-stack-dev:decagon-node@cluster0.umwvb.mongodb.net/graph",
        test: process.env.TEST_DATABASE_URL ||
            "mongodb+srv://node-stack-dev:decagon-node@cluster0.umwvb.mongodb.net/testing",
    },
    secretKey: process.env.SECRET_KEY ||
        "2006dfe314969440917185bb3125ef3ace02d51c04db9562da17424761b6dca7",
    production: process.env.NODE_ENV === "production",
    development: process.env.NODE_ENV === "development",
    test: process.env.NODE_ENV === "test",
};
