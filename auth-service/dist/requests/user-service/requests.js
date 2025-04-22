"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const axios_1 = __importDefault(require("axios"));
const http_methods_1 = require("../../enums/http-methods");
const jwt_helper_1 = require("../../helpers/jwt.helper");
const errors_1 = require("../../utils/errors");
const createProfile = async (params) => {
    try {
        const response = await (0, axios_1.default)({
            method: http_methods_1.HttpMethod.POST,
            headers: {
                Authorization: `Bearer ${(0, jwt_helper_1.generateToken)()}`,
            },
            url: process.env.USER_SERVICE_URL,
            data: params,
        });
        return response.data;
    }
    catch (e) {
        throw new errors_1.InternalServerError(e);
    }
};
exports.createProfile = createProfile;
