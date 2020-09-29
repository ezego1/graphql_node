"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = __importDefault(require("../config/index"));
const db = index_1.default.databaseUrl[index_1.default.environment];
mongoose_1.default.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log(`${chalk_1.default.green(`Connected to the db successfully........`)}`))
    .catch(error => console.log(error.message));
mongoose_1.default.connection.on('connected', () => [
    console.log(`${chalk_1.default.green(`Mongoose connected to db!`)}`)
]);
mongoose_1.default.connection.on('error', (error) => {
    console.log(error.message);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log(`${chalk_1.default.red(`Mongoose connection is disconnected from db!`)}`);
});
process.on('SIGINT', async () => {
    await mongoose_1.default.connection.close();
    process.exit(0);
});
