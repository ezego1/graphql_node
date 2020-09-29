"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
exports.signAccessToken = (userId, username) => {
    return new Promise((resolve, rejects) => {
        const payload = { userId };
        const secret = process.env.SECRET_KEY;
        const option = { expiresIn: '1h', issuer: 'ezego1', audience: username };
        jsonwebtoken_1.default.sign(payload, secret, option, (error, token) => {
            if (error) {
                console.log(error);
                rejects(new http_errors_1.default.InternalServerError());
            }
            resolve(token);
        });
    });
};
exports.verifyAccessToken = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req["isAuth"] = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === "") {
        req["isAuth"] = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    }
    catch (error) {
        req["isAuth"] = false;
        return next();
    }
    if (!decodedToken) {
        req["isAuth"] = false;
        return next();
    }
    req["isAuth"] = true;
    req["userId"] = decodedToken.userId;
    next();
};
