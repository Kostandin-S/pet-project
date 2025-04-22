"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqBodyExists = void 0;
const errors_1 = __importDefault(require("../constants/errors"));
const errors_2 = require("../utils/errors");
const reqBodyExists = async (req, _, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        next(new errors_2.BadRequest(errors_1.default.MISSING_REQ_BODY));
        return;
    }
    next();
};
exports.reqBodyExists = reqBodyExists;
