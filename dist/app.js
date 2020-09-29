"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schemas_1 = __importDefault(require("./graphql/schemas"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const jwt_helper_1 = require("./helpers/jwt_helper");
// dotenv.config();
require("./helpers/init_mongodb");
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
    res.status(200).send("Hello And Welcome to My GraphQL API Please Add /graphql to your current url!");
});
app.use(jwt_helper_1.verifyAccessToken);
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schemas_1.default,
    rootValue: resolvers_1.default,
    graphiql: true
}));
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound("This route does not exit!"));
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: "error",
        message: error.message,
    });
    next();
});
exports.default = app;
