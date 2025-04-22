"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const http_status_code_1 = require("./enums/http-status-code");
const service = __importStar(require("./users.services"));
const users_validator_1 = require("./users.validator");
const getUsers = async (_req, res, next) => {
    try {
        const users = await service.getUsers();
        res.status(http_status_code_1.HttpStatusCode.OK).json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res, next) => {
    try {
        const userId = (0, users_validator_1.validateId)(req.params?.id);
        const user = await service.getUserById(userId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res, next) => {
    try {
        const createdUser = await service.createUser(req.body);
        res.status(http_status_code_1.HttpStatusCode.Created).json(createdUser);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    try {
        const userId = (0, users_validator_1.validateId)(req.params?.id);
        const updatedUser = await service.updateUser(userId, req.body);
        res.status(http_status_code_1.HttpStatusCode.OK).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const userId = (0, users_validator_1.validateId)(req.params?.id);
        const deletedUser = await service.deleteUser(userId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(deletedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
