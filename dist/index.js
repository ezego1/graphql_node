"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = __importDefault(require("./config/index"));
const PORT = index_1.default.port;
app_1.default.listen(PORT, () => {
    console.log(`${chalk_1.default.blue(`App is now listening on port: ${PORT}`)}`);
});
