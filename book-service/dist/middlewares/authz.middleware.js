"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authzMiddleware = void 0;
const errors_1 = __importDefault(require("../constants/errors"));
const errors_2 = require("../utils/errors");
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role || (Role = {}));
const authzMiddleware = (req, _res, next) => {
    if (req.headers["x-user-role"] === Role.User) {
        next(new errors_2.NotAuthenticated(errors_1.default.MISSING_ROLE));
        return;
    }
    next();
};
exports.authzMiddleware = authzMiddleware;
