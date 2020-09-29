"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../../model/User.model"));
const jwt_helper_1 = require("../../helpers/jwt_helper");
const validation_schema_1 = require("../../helpers/validation_schema");
const http_errors_1 = __importDefault(require("http-errors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const people = {
    createUser: async ({ userInput }, req) => {
        // if (!req.isAuth) {
        //   throw new Error("Unauthenticated, access Denied!");
        // }
        const existingUser = await User_model_1.default.findOne({ username: userInput.username });
        if (existingUser) {
            throw new http_errors_1.default.Conflict("User exist already!");
        }
        const newUser = new User_model_1.default({
            username: userInput.username,
            password: userInput.password,
        });
        const createdUser = await newUser.save();
        return createdUser;
    },
    login: async ({ username, password }) => {
        try {
            const result = await validation_schema_1.authSchema.validateAsync({
                username,
                password,
            });
            const foundUser = await User_model_1.default.findOne({ username: result.username });
            if (!foundUser)
                throw new http_errors_1.default.NotFound("User not registered");
            const isMatch = await bcryptjs_1.default.compare(password, foundUser["password"]);
            if (!isMatch)
                throw new http_errors_1.default.Unauthorized("Username/Password not valid");
            const accessToken = await jwt_helper_1.signAccessToken(foundUser["_id"], foundUser["username"]);
            return { userID: foundUser._id, token: accessToken, tokenExpiration: 1 };
        }
        catch (error) {
            if (error.isJoi === true)
                throw new http_errors_1.default.BadRequest("Invalid username/password");
            throw error;
        }
    },
    updateUser: async ({ username, newUsername, newPassword }, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated, access Denied!");
        }
        const existingUser = User_model_1.default.findOne({ username });
        existingUser['username'] = newUsername;
        existingUser['password'] = newPassword;
        const saved = (await existingUser).save();
        return saved;
    },
    removeUser: async ({ username }, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated, access Denied!");
        }
        const deleted = await User_model_1.default.findOneAndDelete({ username });
        return deleted;
    },
};
exports.default = people;
