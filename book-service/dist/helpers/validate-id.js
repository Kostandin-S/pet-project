"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const errors_1 = __importDefault(require("../constants/errors"));
const errors_2 = require("../utils/errors");
const validateId = (providedId) => {
    if (!providedId)
        throw new errors_2.BadRequest(errors_1.default.INVALID_ID);
    return providedId;
};
exports.validateId = validateId;
